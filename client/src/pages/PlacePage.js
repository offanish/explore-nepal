import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import notFoundImage from '../assets/images/not-found-image.jpg'
import Wrapper from '../assets/wrappers/Place'
import Alert from '../components/Alert'
import Loading from '../components/Loading'
import { useDeletePlaceMutation, useGetPlaceByIdQuery } from '../state/apiSlice'
import { displayAlertThunk } from '../state/globalSlice'

const PlacePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, showAlert } = useSelector((state) => state.global)

  const { data: place, isLoading } = useGetPlaceByIdQuery(id)
  const [deletePlace] = useDeletePlaceMutation()

  const handleDeletePlace = () => {
    deletePlace(place._id)
      .unwrap()
      .then(() => {
        navigate('/places')
        dispatch(
          displayAlertThunk({
            alertType: 'success',
            alertText: 'Deleted Place Successfully',
          })
        )
      })
      .catch((error) => {
        dispatch(
          displayAlertThunk({ alertType: 'danger', alertText: error.data.msg })
        )
      })
  }

  if (!place || isLoading) {
    return <Loading />
  }
  return (
    <>
      {showAlert && <Alert margin />}
      <Wrapper placePage>
        <img
          className='image image-full'
          src={place.image}
          alt={place.name}
          onError={(event) => {
            event.target.src = notFoundImage
            event.onError = null
          }}
        />
        <div className='place-details'>
          <div className='place-details-text'>
            <h2>{place.name}</h2>
            <p className={'description-full'}>{place.description}</p>
            <span>
              <i className='fa-solid fa-user'></i>
              <span className='place-owner'>{place.createdBy.name}</span>
            </span>
            <div className='place-bottom'>
              <div className='location'>
                <i className='fa-solid fa-location-dot'></i>
                <span>{place.location}</span>
              </div>
            </div>
          </div>
          {user && user._id === place.createdBy._id && (
            <div className='buttons-container'>
              <Link
                to='/places/new'
                state={{ isEditing: true, place }}
                className='btn btn-edit'
              >
                Edit
              </Link>
              <button className='btn btn-delete' onClick={handleDeletePlace}>
                Delete
              </button>
            </div>
          )}
        </div>
      </Wrapper>
    </>
  )
}

export default PlacePage
