import Wrapper from '../assets/wrappers/Place'
import notFoundImage from '../assets/images/not-found-image.jpg'
import { useNavigate } from 'react-router-dom'

const Place = ({ name, location, description, image, id }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/places/${id}`)
  }
  return (
    <Wrapper onClick={handleClick}>
      <img
        className="image"
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
          <p>{description}</p>
          <div className="place-bottom">
            <div className="location">
              <i className="fa-solid fa-location-dot"></i>
              <span>{location}</span>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Place
