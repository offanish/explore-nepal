import axios from 'axios'

export async function getUser() {
  const { data } = await axios.get('/api/auth/user', {
    withCredentials: true,
  })
  return data
}
export async function getPlaceOwner(ownerId) {
  const { data } = await axios.get(`/api/auth/user/${ownerId}`)
  return data.user
}
export async function getUserPlaces(userId) {
  const { data } = await axios.get(`/api/auth/user/${userId}/places`)
  return data.places
}
export async function loginUser(user) {
  const { data } = await axios.post('/api/auth/login', user)
  return data
}
export async function registerUser(newUser) {
  const { data } = await axios.post('/api/auth/register', newUser)
  return data
}
export async function logout() {
  return await axios.post('/api/auth/logout')
}
