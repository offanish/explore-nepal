import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ClipLoader from 'react-spinners/ClipLoader'
import { useCreatePlaceMutation } from '../state/apiSlice'
import { displayAlertThunk } from '../state/globalSlice'
import Wrapper from '../assets/wrappers/NewPlace'
import Alert from '../components/Alert'

const initialValues = { name: '', location: '', description: '' }

const NewPlace = () => {
  const dispatch = useDispatch()
  const { showAlert, user } = useSelector((state) => state.global)

  const navigate = useNavigate()

  const [values, setValues] = useState(initialValues)
  const [images, setImages] = useState([])
  const [imgPreview, setImgPreview] = useState([])
  const fileUpload = useRef()

  const handleChange = (event) => {
    setValues((values) => {
      return { ...values, [event.target.name]: event.target.value }
    })
  }

  const clearValues = () => {
    setValues(initialValues)
  }

  const [createPlace, { isLoading }] = useCreatePlaceMutation()

  useEffect(() => {
    if (!user) {
      navigate('/sign-up')
      dispatch(
        displayAlertThunk({
          alertText: 'Please sign in to add new place',
          alertType: 'danger',
        })
      )
    }
  }, [user, navigate, dispatch])

  const handleAddImage = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const fileSrc = URL.createObjectURL(file)
    setImgPreview([...imgPreview, { fileName: file.name, fileSrc }])
    setImages([...images, file])
  }
  const handleDeleteImage = (img) => {
    setImgPreview((prevImgPreview) =>
      prevImgPreview.filter((item) => item.fileSrc !== img.fileSrc)
    )
    setImages((prevImages) =>
      prevImages.filter((item) => item.name !== img.fileName)
    )
    URL.revokeObjectURL(img.fileName)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const { name, location, description } = values
    if (!name || !location || !description) {
      dispatch(
        displayAlertThunk({
          alertText: 'Please fill all required fields',
          alertType: 'danger',
        })
      )
      return
    }
    const formData = new FormData()
    if (images.length) {
      images.forEach((img) => {
        formData.append('image', img, img.name)
      })
      formData.append('name', values.name)
      formData.append('location', values.location)
      formData.append('description', values.description)
    }
    createPlace(formData)
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
          displayAlertThunk({
            alertText: error.data.msg,
            alertType: 'danger',
          })
        )
      })
  }
  return (
    <Wrapper>
      <h1>Add New Place</h1>
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
          <label className='image-upload-label' htmlFor='image'>
            <div className='image-upload'>
              <i className='fa-solid fa-upload'></i>
              <span>Choose Image</span>
            </div>
          </label>
          <input
            type='file'
            ref={fileUpload}
            id='image'
            name='image'
            style={{ display: 'none' }}
            onChange={handleAddImage}
          />
        </div>
        {imgPreview.length > 0 && (
          <div className='form-row'>
            <div className='thumbnail-images'>
              {imgPreview.map((img, index) => {
                return (
                  <div key={index} className='img-group-container'>
                    <figure className='img-thumbnail-container'>
                      <img
                        className='img-thumbnail'
                        alt='uploaded'
                        src={img.fileSrc}
                      />
                    </figure>
                    <i
                      className='fa-solid fa-xmark'
                      onClick={() => handleDeleteImage(img)}
                    ></i>
                  </div>
                )
              })}
              <div
                onClick={() => fileUpload.current.click()}
                className='img-thumbnail-container add-new-image'
              >
                <i className='fa-solid fa-plus'></i>
              </div>
            </div>
          </div>
        )}
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
        <button disabled={isLoading} className='btn btn-block'>
          {isLoading ? <ClipLoader color='#ffffff' size='1rem' /> : 'Submit'}
        </button>
      </form>
    </Wrapper>
  )
}

export default NewPlace
