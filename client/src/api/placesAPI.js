import axios from 'axios'

export async function getAllPlaces() {
  const { data } = await axios.get('/api/places')
  return data
}

export async function createNewPlace(newPlace, token) {
  const { data } = await axios.post('/api/places', newPlace, {
    headers: { authorization: `Bearer ${token}` },
  })
  return data
}

export async function deletePlace(placeId, token) {
  await axios.delete(`/api/places/${placeId}`, {
    headers: { authorization: `Bearer ${token}` },
  })
}

export async function editPlace(editedPlace, editedPlaceId, token) {
  await axios.patch(`/api/places/${editedPlaceId}`, editedPlace, {
    headers: { authorization: `Bearer ${token}` },
  })
}
