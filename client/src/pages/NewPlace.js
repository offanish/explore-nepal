import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ClipLoader from 'react-spinners/ClipLoader'
import { useCreatePlaceMutation, useEditPlaceMutation } from '../state/apiSlice'
import { displayAlertThunk } from '../state/globalSlice'
import Wrapper from '../assets/wrappers/NewPlace'
import Alert from '../components/Alert'

const initialValues = { name: '', location: '', image: '', description: '' }

const NewPlace = () => {
  const dispatch = useDispatch()
  const { showAlert } = useSelector((state) => state.global)

  const navigate = useNavigate()

  const location = useLocation()
  const isEditing = location.state?.isEditing
  const currentPlace = location.state?.place
  const editId = currentPlace?._id

  const [values, setValues] = useState(initialValues)

  const handleChange = (event) => {
    setValues((values) => {
      return { ...values, [event.target.name]: event.target.value }
    })
  }

  const clearValues = () => {
    setValues(initialValues)
  }

  useEffect(() => {
    if (isEditing) {
      setValues({
        name: currentPlace?.name,
        image: currentPlace?.image,
        location: currentPlace?.location,
        description: currentPlace?.description,
      })
    }
  }, [
    currentPlace?.description,
    currentPlace?.image,
    currentPlace?.location,
    currentPlace?.name,
    isEditing,
  ])

  const [createPlace, { isLoading }] = useCreatePlaceMutation()
  const [editPlace, { isLoading: isEditingLoading }] = useEditPlaceMutation()

  const handleSubmit = (event) => {
    event.preventDefault()
    const { name, location, image, description } = values
    if (!name || !location || !image || !description) {
      dispatch(
        displayAlertThunk({
          alertText: 'Please fill all required fields',
          alertType: 'danger',
        })
      )
      return
    }
    if (isEditing) {
      editPlace({ editId, values })
        .unwrap()
        .then((data) => {
          dispatch(
            displayAlertThunk({
              alertText: 'Edited Place Successfully',
              alertType: 'success',
            })
          )
          navigate(`/places/${currentPlace._id}`)
          clearValues()
        })
        .catch((error) => {
          dispatch(
            displayAlertThunk({
              alertText: error.data.msg,
              alertType: 'danger',
            })
          )
        })
      return
    }
    createPlace(values)
      .unwrap()
      .then((data) => {
        dispatch(
          displayAlertThunk({
            alertText: 'Place Created Successfully',
            alertType: 'success',
          })
        )
        navigate(`/places/${data._id}`)
        clearValues()
      })
      .catch((error) => {
        dispatch(
          displayAlertThunk({ alertText: error.data.msg, alertType: 'danger' })
        )
      })
  }

  return (
    <Wrapper>
      <h1>{isEditing ? 'Edit Place' : 'Add New Place'}</h1>
      <form onSubmit={handleSubmit} className='form'>
        {showAlert && <Alert />}
        <div className='form-row'>
          <label className='form-label' htmlFor='name'>
            Name
          </label>
          <input
            className='form-input'
            type='text'
            name='name'
            value={values.name}
            onChange={handleChange}
          />
        </div>
        <div className='form-row'>
          <label className='form-label' htmlFor='location'>
            Location
          </label>
          <input
            className='form-input'
            type='text'
            name='location'
            value={values.location}
            onChange={handleChange}
          />
        </div>
        <div className='form-row'>
          <label className='form-label' htmlFor='image'>
            Image
          </label>
          <input
            className='form-input'
            type='text'
            name='image'
            value={values.image}
            onChange={handleChange}
          />
        </div>
        <div className='form-row'>
          <label className='form-label' htmlFor='description'>
            Description
          </label>
          <textarea
            className='form-input description'
            type='text'
            name='description'
            value={values.description}
            onChange={handleChange}
          />
        </div>
        <button
          disabled={isLoading || isEditingLoading}
          className='btn btn-block'
        >
          {isLoading || isEditingLoading ? (
            <ClipLoader color='#ffffff' size='1rem' />
          ) : (
            'Submit'
          )}
        </button>
      </form>
    </Wrapper>
  )
}

export default NewPlace
