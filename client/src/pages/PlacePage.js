import { Link, useParams, useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { useMutation, useQuery } from 'react-query'

import notFoundImage from '../assets/images/not-found-image.jpg'
import Wrapper from '../assets/wrappers/Place'

import { useMainContext } from '../context/MainContext'
import {
  GET_PLACES_ERROR,
  DELETE_PLACE_SUCCESS,
  DELETE_PLACE_ERROR,
} from '../context/actions'

import Alert from '../components/Alert'
import Loading from '../components/Loading'

import { getAllPlaces, deletePlace } from '../api/placesAPI'

const PlacePage = () => {
  const { id } = useParams()
  const { user, showAlert, clearAlert, dispatch } = useMainContext()
  const navigate = useNavigate()

  const { data: allPlaces = [], isLoading } = useQuery('places', getAllPlaces, {
    onError: () => dispatch({ type: GET_PLACES_ERROR }),
  })

  const currentPlace = useMemo(
    () => allPlaces.find((place) => place._id === id),
    [allPlaces, id]
  )

  const { mutate: deletePlaceMutate, isLoading: isDeleting } = useMutation(
    () => deletePlace(id, 'token'),
    {
      onSuccess: () => {
        dispatch({ type: DELETE_PLACE_SUCCESS })
        navigate('/places')
        clearAlert()
      },
      onError: (error) => {
        dispatch({
          type: DELETE_PLACE_ERROR,
          payload: { msg: error.response.data.msg },
        })
        clearAlert()
      },
    }
  )

  const handleDeletePlace = () => {
    deletePlaceMutate()
  }

  if (!currentPlace || isLoading || isDeleting) {
    return <Loading />
  }
  return (
    <>
      {showAlert && <Alert margin />}
      <Wrapper placePage>
        <img
          className="image image-full"
          src={currentPlace.image}
          alt={currentPlace.name}
          onError={(event) => {
            event.target.src = notFoundImage
            event.onError = null
          }}
        />
        <div className="place-details">
          <div className="place-details-text">
            <h2>{currentPlace.name}</h2>
            <p className={'description-full'}>{currentPlace.description}</p>
            <span>Added by: random</span>
            <div className="place-bottom">
              <div className="location">
                <i className="fa-solid fa-location-dot"></i>
                <span>{currentPlace.location}</span>
              </div>
            </div>
          </div>
          {user && (
            <div className="buttons-container">
              <Link
                to="/places/new"
                state={{ isEditing: true, currentPlace }}
                className="btn btn-edit"
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
    </>
  )
}

export default PlacePage
