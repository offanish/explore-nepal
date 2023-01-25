import axios from 'axios'

export async function getAllPlaces() {
  const { data } = await axios.get('/api/places', {
    withCredentials: true,
  })
  return data
}

export async function createNewPlace(newPlace) {
  const { data } = await axios.post('/api/places', newPlace, {
    withCredentials: true,
  })
  return data
}

export async function deletePlace(placeId) {
  await axios.delete(`/api/places/${placeId}`, { withCredentials: true })
}

export async function editPlace(editedPlace, editedPlaceId) {
  await axios.patch(`/api/places/${editedPlaceId}`, editedPlace, {
    withCredentials: true,
  })
}
