import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("./database/database.sqlite");

import type { iProduct } from "./types/Iproduct.ts";

export function criarProduto({ nome, slug, preco, quantidade }: iProduct) {
  try {
    return db
      .prepare(
        /*sql*/ `
    INSERT OR IGNORE INTO "produtos"("nome", "slug", "preco", 
      "quantidade") VALUES(?,?,?,?)
  
    `,
      )
      .run(nome, slug, preco, quantidade);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function productAlreadyExists(slug: string) {
  return db
    .prepare(/*sql*/ `SELECT * FROM "PRODUTOS" WHERE "slug" = ?`)
    .get(slug);
}

export function getProducts() {
  try {
    return db
      .prepare(
        /*sql*/ `
   SELECT * FROM "produtos"
  
    `,
      )
      .all();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function getProductById(id: number) {
  try {
    return db
      .prepare(
        /*sql*/ `
   SELECT * FROM "PRODUTOS" WHERE "id" = ?
    `,
      )
      .get(id);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function updateProductById(
  id: number,
  nome: string,
  preco: number,
  quantidade: number,
) {
  try {
    const result = db
      .prepare(
        /*sql*/ `
   UPDATE "produtos" set "nome"= ?, "preco" = ?, "quantidade" = ? WHERE "id" = ? 
    `,
      )
      .run(nome, preco, quantidade, id);
    if (result.changes === 0) {
      return null;
    }
    return db.prepare(/*sql*/ `SELECT * FROM "produtos" where id = ?`).get(id);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function deleteProductById(id: number) {
  try {
    return db
      .prepare(
        /*sql*/
        `
    DELETE FROM 'produtos' WHERE "id" = ? 
    `,
      )
      .run(id);
  } catch (error) {
    console.log(error);
    return null;
  }
}
