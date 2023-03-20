// import Loading from '../components/Loading'
// import Place from '../components/Place'
import Alert from '../components/Alert'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../assets/wrappers/Profile'
import Loading from '../components/Loading'
import Place from '../components/Place'
import { useGetMyPlacesQuery } from '../state/apiSlice'
import { displayAlertThunk } from '../state/globalSlice'

const Profile = () => {
  const dispatch = useDispatch()
  const { showAlert } = useSelector((state) => state.global)
  const {
    data: allPlaces = [],
    isFetching,
    isError,
    refetch,
    error,
  } = useGetMyPlacesQuery()

  useEffect(() => {
    refetch()
  }, [refetch])

  useEffect(() => {
    if (isError) {
      dispatch(
        displayAlertThunk({ alertText: error.data.msg, alertType: 'danger' })
      )
    }
  }, [dispatch, isError, error?.data.msg])

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
    <>
      {showAlert && <Alert />}
      <Wrapper>
        <section className='user-details-container'>
          <h2 className='user-profile-heading'>User Details</h2>
        </section>
        <section className='user-places-container'>
          <h2 className='user-profile-heading'>User Places</h2>
          {isFetching ? <Loading /> : <div className='container'>{places}</div>}
        </section>
      </Wrapper>
    </>
  )
}

export default Profile
