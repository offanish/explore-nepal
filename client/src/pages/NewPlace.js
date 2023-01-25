import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
import ClipLoader from 'react-spinners/ClipLoader'

import { useMainContext } from '../context/MainContext'
import {
  CREATE_PLACE_ERROR,
  CREATE_PLACE_SUCCESS,
  EDIT_PLACE_SUCCESS,
  EDIT_PLACE_ERROR,
} from '../context/actions'

import Wrapper from '../assets/wrappers/NewPlace'
import Alert from '../components/Alert'
import { createNewPlace, editPlace } from '../api/placesAPI'

const initialValues = { name: '', location: '', image: '', description: '' }

const NewPlace = () => {
  const { showAlert, displayAlert, dispatch, clearAlert } = useMainContext()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const location = useLocation()
  const isEditing = location.state?.isEditing
  const currentPlace = location.state?.currentPlace
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
  //create place mutation
  const { mutate: createPlaceMutation, isLoading } = useMutation(
    (values) => createNewPlace(values),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('places')
        clearValues()
        dispatch({ type: CREATE_PLACE_SUCCESS })
        navigate(`/places/${data._id}`)
        clearAlert()
      },
      onError: (error) => {
        dispatch({
          type: CREATE_PLACE_ERROR,
          payload: { msg: error.response.data.msg },
        })
        clearAlert()
      },
    }
  )
  //edit place mutation
  const { mutate: editPlaceMutation, isLoading: isEditingLoading } =
    useMutation((values) => editPlace(values, editId), {
      onSuccess: (data) => {
        queryClient.invalidateQueries('places')
        clearValues()
        dispatch({ type: EDIT_PLACE_SUCCESS })
        navigate(`/places/${currentPlace._id}`)
        clearAlert()
      },
      onError: (error) => {
        dispatch({
          type: EDIT_PLACE_ERROR,
          payload: { msg: error.response.data.msg },
        })
        clearAlert()
      },
    })
  //set initial values while editing
  useEffect(() => {
    if (isEditing) {
      setValues({
        name: currentPlace?.name,
        image: currentPlace?.image,
        location: currentPlace?.location,
        description: currentPlace?.description,
      })
    }
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const { name, location, image, description } = values
    if (!name || !location || !image || !description) {
      displayAlert()
      return
    }
    if (isEditing) {
      editPlaceMutation(values)
      return
    }
    createPlaceMutation(values)
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
