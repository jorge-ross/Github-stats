import collectionClient from "./collection-client";

export async function createFavorite(data) {
  return await collectionClient("/favorites", { body: data });
}

export async function removeFavorite(id) {
  return await collectionClient("/favorites/" + id, { method: "DELETE" });
}

export async function getFavorites() {
  return await collectionClient("/favorites");
}
