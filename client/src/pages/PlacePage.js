import { useMainContext } from '../context/MainContext'
import { useParams } from 'react-router-dom'
import Place from '../components/Place'
import { useEffect, useMemo } from 'react'
import Alert from '../components/Alert'
import Wrapper from '../assets/wrappers/PlacePage'

const PlacePage = () => {
  const { id } = useParams()
  const { allPlaces, getAllPlaces, showAlert } = useMainContext()

  useEffect(() => {
    allPlaces.length === 0 && getAllPlaces()
  }, [])

  const currentPlace = allPlaces.find((place) => place._id === id)

  return (
    <Wrapper>
      {showAlert && <Alert margin />}
      <Place {...currentPlace} id={id} placePage />
    </Wrapper>
  )
}

export default PlacePage
