import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import ClipLoader from 'react-spinners/ClipLoader'

import notFoundImage from '../assets/images/not-found-image.jpg'
import Wrapper from '../assets/wrappers/Place'
import Alert from '../components/Alert'
import Loading from '../components/Loading'
import Rating from '../components/Rating'

import {
  useAddNewReviewMutation,
  useDeletePlaceMutation,
  useGetPlaceByIdQuery,
  useGetPlaceReviewsQuery,
} from '../state/apiSlice'
import { displayAlertThunk } from '../state/globalSlice'
import { useState } from 'react'

const PlacePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, showAlert } = useSelector((state) => state.global)

  const [rating, setRating] = useState(1)
  const [comment, setComment] = useState('')

  const { data: place, isLoading } = useGetPlaceByIdQuery(id)
  const { data: reviews, isLoading: isReviewLoading } =
    useGetPlaceReviewsQuery(id)
  const [deletePlace, { isLoading: isDeleting }] = useDeletePlaceMutation()
  const [addNewReview, { isLoading: isAddingReview }] =
    useAddNewReviewMutation()

  const handleDeletePlace = async (id) => {
    try {
      await deletePlace(id).unwrap()
      navigate('/places')
      dispatch(
        displayAlertThunk({
          alertType: 'success',
          alertText: 'Deleted Place Successfully',
        })
      )
    } catch (error) {
      dispatch(
        displayAlertThunk({ alertType: 'danger', alertText: error.data.msg })
      )
    }
  }

  const handleAddReview = async (event) => {
    try {
      event.preventDefault()
      if (!rating) {
        dispatch(
          displayAlertThunk({
            alertType: 'danger',
            alertText: 'Rating is required',
          })
        )
      }
      await addNewReview({
        placeId: place._id,
        rating,
        comment,
      }).unwrap()
    } catch (error) {
      dispatch(
        displayAlertThunk({ alertType: 'danger', alertText: error.data.msg })
      )
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  }

  if (!place || isLoading) {
    return <Loading />
  }

  return (
    <section
      className='place-page'
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {showAlert && <Alert margin />}
      <Wrapper placePage>
        <Carousel
          showThumbs={false}
          showArrows={true}
          infiniteLoop={true}
          emulateTouch={true}
          showStatus={false}
          autoPlay={true}
          interval={3000}
          stopOnHover={true}
        >
          {place.image.map((img, index) => (
            <img
              key={index}
              className='image image-full'
              src={img.url}
              alt={place.name}
              onError={(event) => {
                event.target.src = notFoundImage
                event.onError = null
              }}
            />
          ))}
        </Carousel>
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
              <Link to={`/places/${place._id}/edit`} className='btn btn-edit'>
                Edit
              </Link>
              <button
                className='btn btn-delete'
                disabled={isDeleting}
                onClick={() => handleDeletePlace(place._id)}
              >
                {isDeleting ? (
                  <ClipLoader color='#ffffff' size='1rem' />
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          )}
        </div>
      </Wrapper>

      {user && (
        <Wrapper placePage>
          <h2 className='review-heading'>Add a review</h2>
          <form onSubmit={handleAddReview}>
            <div className='form-row'>
              <label>Rating</label>
              <Rating value={rating} setRating={setRating} />
            </div>
            <div className='form-row'>
              <label htmlFor='description'>Comment</label>
              <textarea
                type='text'
                id='description'
                name='description'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className='form-input description'
              />
              <div className='review-submit-btn-group'>
                <button type='submit' disabled={isAddingReview} className='btn'>
                  {isAddingReview ? (
                    <ClipLoader color='#ffffff' size='1rem' />
                  ) : (
                    'Submit'
                  )}
                </button>
              </div>
            </div>
          </form>
        </Wrapper>
      )}
      <Wrapper placePage ratingViewOnly>
        <h2 className='review-heading'>Reviews</h2>
        {isReviewLoading ? (
          <Loading />
        ) : reviews.length === 0 ? (
          <p className='no-reviews-text'>No Reviews</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className='review-container'>
              <h3 className='review-name'>{review.createdBy.name}</h3>
              <Rating value={review.rating} viewOnly />
              {review.comment && (
                <h4 className='review-comment'>{review.comment}</h4>
              )}
            </div>
          ))
        )}
      </Wrapper>
    </section>
  )
}

export default PlacePage
