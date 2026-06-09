const baseUrl = "http://localhost:3000";

const product = {
  nome: "Arroz",
  preco: 990,
  quantidade: 2,
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

async function updateProduct() {
  const res = await fetch(`${baseUrl}/products?id=5`, {
    method: "PUT",
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

async function deleteProduct() {
  const res = await fetch(`${baseUrl}/products?id=5`, {
    method: "DELETE",
  });
  const data = await res.json();
  console.log(data);
}

const actions = {
  post: postProduct,
  list: getProducts,
  one: getProduct,
  put: updateProduct,
  delete: deleteProduct,
};

const action = process.argv[2] as keyof typeof actions;

actions[action]();
