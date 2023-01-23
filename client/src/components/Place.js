import { useMainContext } from '../context/MainContext'
import Wrapper from '../assets/wrappers/Place'
import notFoundImage from '../assets/images/not-found-image.jpg'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Place = ({
  name,
  location,
  description,
  image,
  id,
  placePage,
  createdBy,
  creatorName,
}) => {
  const navigate = useNavigate()
  const { deletePlace, setEditPlace, user } = useMainContext()

  const deleteSuccess = () => {
    navigate('/')
  }

  const handleDeletePlace = () => {
    deletePlace(id, deleteSuccess)
  }
  const handleEditPlace = () => {
    setEditPlace(id)
  }
  const handleClick = () => {
    !placePage && navigate(`/places/${id}`)
  }
  return (
    <Wrapper onClick={handleClick} placePage={placePage}>
      <img
        className={`image ${placePage && 'image-full'}`}
        src={image}
        alt={name}
        onError={(event) => {
          event.target.src = notFoundImage
          event.onError = null
        }}
      />
      <div className="place-details">
        <div className="place-details-text">
          <h2>{name}</h2>
          <p className={placePage && 'description-full'}>{description}</p>
          <span>Added by: {creatorName}</span>
          <div className="place-bottom">
            <div className="location">
              <i className="fa-solid fa-location-dot"></i>
              <span>{location}</span>
            </div>
          </div>
        </div>
        {placePage && user && (
          <div className="buttons-container">
            <Link
              to="/places/new"
              className="btn btn-edit"
              onClick={handleEditPlace}
            >
              Edit
            </Link>
            <button className="btn btn-delete" onClick={handleDeletePlace}>
              Delete
            </button>
          </div>
        )}
      </div>
    </Wrapper>
  )
}

export default Place
