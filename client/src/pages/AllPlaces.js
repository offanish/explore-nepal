import Place from '../components/Place'
import Wrapper from '../assets/wrappers/AllPlaces'
import Loading from '../components/Loading'
import Alert from '../components/Alert'
import { useGetAllPlacesQuery } from '../state/apiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { displayAlertThunk } from '../state/globalSlice'
import { useEffect } from 'react'
import Search from '../components/Search'
import { useParams } from 'react-router-dom'

const AllPlaces = () => {
  const dispatch = useDispatch()
  const { keyword } = useParams()
  const {
    data: allPlaces = [],
    isLoading,
    isError,
    error,
  } = useGetAllPlacesQuery(keyword)

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
      {!keyword && (
        <>
          <h1>Search Place</h1>
          <Search />
        </>
      )}
      {allPlaces.length ? (
        <h1>{!keyword ? 'All Places' : `Search results for ${keyword}`}</h1>
      ) : (
        <h1>No Place Found</h1>
      )}
      <div className='container'>{places}</div>
    </Wrapper>
  )
}

export default AllPlaces
