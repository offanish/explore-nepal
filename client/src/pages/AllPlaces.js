import Place from '../components/Place'
import Wrapper from '../assets/wrappers/AllPlaces'
import Loading from '../components/Loading'
import Alert from '../components/Alert'
import { useMainContext } from '../context/MainContext'
import { useQuery } from 'react-query'
import { getAllPlaces } from '../api/placesAPI'
import { GET_PLACES_ERROR } from '../context/actions'

const AllPlaces = () => {
  const { showAlert, dispatch } = useMainContext()

  const { data: allPlaces = [], isLoading } = useQuery('places', getAllPlaces, {
    onError: () => dispatch({ type: GET_PLACES_ERROR }),
  })

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
  if (isLoading) {
    return <Loading />
  }
  return (
    <Wrapper>
      {showAlert && <Alert />}
      <h1>All Places</h1>
      <div className="container">{places}</div>
    </Wrapper>
  )
}

export default AllPlaces
