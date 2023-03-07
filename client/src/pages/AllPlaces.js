import Place from '../components/Place'
import Wrapper from '../assets/wrappers/AllPlaces'
import Loading from '../components/Loading'
import Alert from '../components/Alert'
import { useGetAllPlacesQuery } from '../state/apiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { displayAlertThunk } from '../state/globalSlice'
import { useEffect } from 'react'

const AllPlaces = () => {
  const dispatch = useDispatch()
  const {
    data: allPlaces = [],
    isLoading,
    isError,
    error,
  } = useGetAllPlacesQuery()

  useEffect(() => {
    if (isError) {
      dispatch(
        displayAlertThunk({ alertType: 'danger', alertText: error.data.msg })
      )
    }
  }, [isError, dispatch, error?.data.msg])

  const { showAlert } = useSelector((state) => state.global)

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
      <div className='container'>{places}</div>
    </Wrapper>
  )
}

export default AllPlaces
