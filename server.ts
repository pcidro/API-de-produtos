import { createServer } from "node:http";
import { Router } from "./router.ts";
import { customRequest } from "./customRequest.ts";
import { customResponse } from "./customResponse.ts";
import {
  criarProduto,
  getProductById,
  getProducts,
  productAlreadyExists,
} from "./database.ts";
const router = new Router();

router.post("/products", (req, res) => {
  const { nome, slug, preco, quantidade } = req.body;
  const produtoAlreadyExists = productAlreadyExists(slug);
  if (produtoAlreadyExists) {
    return res.status(409).json({
      error: "Já existe um produto com esse slug",
    });
  }

  const produto = criarProduto({ nome, slug, preco, quantidade });
  if (produto) {
    res.status(201).json(`Produto foi criado com sucesso!!`);
  } else {
    res.status(400).json("Erro ao criar produto");
  }
});

router.get("/products", (req, res) => {
  const id = req.query.get("id");

  if (id) {
    const produtoById = getProductById(Number(id));
    if (produtoById) {
      return res.status(200).json(produtoById);
    } else {
      res.status(400).json("Erro ao localizar produto");
    }
  }

  const produtos = getProducts();
  if (produtos) {
    return res.status(200).json(produtos);
  } else {
    res.status(400).json("Erro ao localizar produtos");
  }
});

const server = createServer(async (request, response) => {
  const res = customResponse(response);
  const req = await customRequest(request);

  const handler = router.find(req.method || "", req.pathname);

  if (handler) {
    handler(req, res);
  } else {
    res.status(404).end("Rota não encontrada");
  }
});

server.listen(3000, () => {
  console.log("Server:http://localhost:3000");
});
