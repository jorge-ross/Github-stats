export const BASE_URI = "https://api.github.com/users/";

export async function getGitProfile(query) {
  let result = await fetch(BASE_URI + query);
  let data;

  if (!result.ok) {
    try {
      data = await result.json();
    } catch (error) {
      console.log(error);
    }
  }
  return data;
}

export async function getProfileFollowers(user, page) {
  return fetch(BASE_URI + user + `/followers?per_page=7&page=${page}`).then(
    (response) => response.json()
  );
}
