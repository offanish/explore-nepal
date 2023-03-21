import Alert from '../components/Alert'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../assets/wrappers/Profile'
import Loading from '../components/Loading'
import Place from '../components/Place'
import { useGetMyPlacesQuery } from '../state/apiSlice'
import { displayAlertThunk } from '../state/globalSlice'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { showAlert, user } = useSelector((state) => state.global)
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
    if (!user) {
      navigate('/places')
    }
    if (isError) {
      dispatch(
        displayAlertThunk({ alertText: error.data.msg, alertType: 'danger' })
      )
    }
  }, [dispatch, isError, error?.data.msg, navigate, user])

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
          <div className='user-details-body'>
            <figure className='user-figure-container'>
              <i className='fa-solid fa-user'></i>
            </figure>
            <h3>Name</h3>
            <p>{user?.name}</p>
            <h3>Email</h3>
            <p>{user?.email}</p>
            <div className='profile-edit-btn'>
              <button className='btn' onClick={() => navigate('/profile/edit')}>
                Edit Profile
              </button>
            </div>
          </div>
        </section>
        <section className='user-places-container'>
          <h2 className='user-profile-heading'>User Places</h2>

          {isFetching ? <Loading /> : <div className='container'>{places}</div>}
          {!places.length && <h1>You haven't added any places</h1>}
        </section>
      </Wrapper>
    </>
  )
}

export default Profile
