import type { iProduct } from "./types/Iproduct";

const baseUrl = "http://localhost:3000";

const product: iProduct = {
  nome: "Arroz",
  slug: "arroz",
  preco: 990,
  quantidade: 3,
};

async function postProduct() {
  const res = await fetch(`${baseUrl}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  const data = await res.json();

  if (!res.ok) {
    console.log("Erro:", data.error);
    return;
  }

  console.log(data);
}

async function getProducts() {
  const res = await fetch(`${baseUrl}/products`);
  const data = await res.json();

  console.log(data);
}

async function getProduct() {
  const res = await fetch(`${baseUrl}/products?id=1`);
  const data = await res.json();

  console.log(data);
}

const actions = {
  post: postProduct,
  list: getProducts,
  one: getProduct,
};

const action = process.argv[2] as keyof typeof actions;

if (!action || !actions[action]) {
  console.log("Escolha uma ação:");
  console.log("node client.ts post");
  console.log("node client.ts list");
  console.log("node client.ts one");
  process.exit();
}

actions[action]();
