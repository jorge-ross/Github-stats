import { BASE_URI } from "./gitapi-service";

async function hitCardData() {
  const response = await fetch(`${BASE_URI}And`);
  let data = response.json();
  return data;
}

export default hitCardData;
