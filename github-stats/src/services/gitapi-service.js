export const BASE_URI = "https://api.github.com/users/";

export async function getGitProfile(query) {
  let response = await fetch(BASE_URI + query);
  let data;

  if (!response.ok) {
    try {
      data = await response.json();
    } catch (error) {
      throw new Error(response.statusText);
    }
    throw new Error(data.message);
  }

  data = await response.json();
  return data;
}

export async function getProfileFollowers(user, page) {
  return fetch(BASE_URI + user + `/followers?per_page=7&page=${page}`).then(
    (response) => response.json()
  );
}

export async function getProfileFollowings(user, page) {
  return fetch(BASE_URI + user + `/following?per_page=7&page=${page}`).then(
    (response) => response.json()
  );
}
