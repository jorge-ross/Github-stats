const BASE_URI = "https://api.github.com/users/";

export function getPokemon(query) {
  console.log(BASE_URI + query.toLowerCase());
  return fetch(BASE_URI + query.toLowerCase()).then((response) =>
    response.json()
  );
}
