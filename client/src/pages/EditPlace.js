import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ClipLoader from 'react-spinners/ClipLoader'
import { useEditPlaceMutation, useGetPlaceByIdQuery } from '../state/apiSlice'
import { displayAlertThunk } from '../state/globalSlice'
import Wrapper from '../assets/wrappers/NewPlace'
import Alert from '../components/Alert'
import Loading from '../components/Loading'

const initialValues = { name: '', location: '', description: '' }

const EditPlace = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { placeId } = useParams()
  const { showAlert } = useSelector((state) => state.global)

  const [values, setValues] = useState(initialValues)
  const [newFiles, setNewFiles] = useState([])
  const [oldImages, setOldImages] = useState([])
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

  const {
    data: currentPlace,
    isSuccess,
    isLoading: isFetchingLoading,
    isError,
  } = useGetPlaceByIdQuery(placeId)
  const [editPlace, { isLoading: isEditingLoading }] = useEditPlaceMutation()

  useEffect(() => {
    if (isSuccess) {
      setImgPreview([
        ...currentPlace?.image.map((img) => {
          return {
            fileName: img,
            fileSrc: img,
          }
        }),
      ])
      setOldImages([...currentPlace?.image])
      setValues({
        name: currentPlace?.name,
        location: currentPlace?.location,
        description: currentPlace?.description,
      })
    }
    if (isError) {
      navigate(-1)
    }
  }, [
    currentPlace?.description,
    currentPlace?.image,
    currentPlace?.location,
    currentPlace?.name,
    isSuccess,
    isError,
    navigate,
  ])

  const handleAddImage = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const fileSrc = URL.createObjectURL(file)
    setImgPreview([...imgPreview, { fileName: file.name, fileSrc }])
    setNewFiles([...newFiles, file])
  }
  const handleDeleteImage = (img) => {
    setImgPreview((prevImgPreview) =>
      prevImgPreview.filter((item) => item.fileSrc !== img.fileSrc)
    )
    setNewFiles((prevNewFiles) =>
      prevNewFiles.filter((item) => item.name !== img.fileName)
    )
    setOldImages((prevOldImages) =>
      prevOldImages.filter((item) => item !== img.fileSrc)
    )
    URL.revokeObjectURL(img?.fileName)
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
    if (!imgPreview.length) {
      dispatch(
        displayAlertThunk({
          alertText: 'Please upload at least one Image',
          alertType: 'danger',
        })
      )
      return
    }
    const formData = new FormData()
    if (newFiles) {
      newFiles.forEach((file) => {
        formData.append('image', file, file.name)
      })
    }
    formData.append('oldImages', JSON.stringify(oldImages))
    formData.append('name', values.name)
    formData.append('location', values.location)
    formData.append('description', values.description)
    editPlace({ placeId, formData })
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
  }
  return (
    <Wrapper>
      <h1>Edit Place</h1>
      {isFetchingLoading && <Loading />}
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
                        src={
                          img.fileSrc.startsWith('blob')
                            ? img.fileSrc
                            : `/public/images/${img.fileSrc}`
                        }
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
        <button disabled={isEditingLoading} className='btn btn-block'>
          {isEditingLoading ? (
            <ClipLoader color='#ffffff' size='1rem' />
          ) : (
            'Submit'
          )}
        </button>
      </form>
    </Wrapper>
  )
}

export default EditPlace
