const BASE_URL = 'https://api.github.com'

export const getUser = async (username) => {
  const res = await fetch(`${BASE_URL}/users/${username}`)
  return res.json()
}

export const getRepos = async (username) => {
  const res = await fetch(`${BASE_URL}/users/${username}/repos`)
  return res.json()
}
