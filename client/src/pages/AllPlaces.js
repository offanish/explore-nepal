import Place from '../components/Place'
import Wrapper from '../assets/wrappers/AllPlaces'
import Loading from '../components/Loading'
import Alert from '../components/Alert'
import { useMainContext } from '../context/MainContext'
import { useEffect } from 'react'

const AllPlaces = () => {
  const { isLoading, showAlert, getAllPlaces, allPlaces } = useMainContext()
  useEffect(() => {
    getAllPlaces()
  }, [])

  const places = allPlaces.map((place) => {
    const { name, location, description, image, _id } = place
    return (
      <Place
        key={_id}
        name={name}
        location={location}
        description={description}
        image={image}
        id={_id}
      />
    )
  })

  return (
    <Wrapper>
      {showAlert && <Alert />}
      <h1>All Places</h1>
      {isLoading && <Loading />}
      <div className="container">{places}</div>
    </Wrapper>
  )
}

export default AllPlaces
