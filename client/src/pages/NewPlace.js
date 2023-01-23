import { useEffect, useState } from 'react'
import Wrapper from '../assets/wrappers/NewPlace'
import Alert from '../components/Alert'
import { useMainContext } from '../context/MainContext'
import { useNavigate } from 'react-router-dom'

const initialValues = { name: '', location: '', image: '', description: '' }

const NewPlace = () => {
  const {
    createNewPlace,
    showAlert,
    isLoading,
    isEditing,
    editingId,
    editPlace,
    displayAlert,
    allPlaces,
  } = useMainContext()
  const [values, setValues] = useState(initialValues)

  const navigate = useNavigate()

  const handleChange = (event) => {
    setValues((values) => {
      return { ...values, [event.target.name]: event.target.value }
    })
  }

  useEffect(() => {
    if (isEditing) {
      const currentPlace = allPlaces.find((place) => place._id === editingId)
      const { name, location, image, description } = currentPlace
      setValues({ name, location, image, description })
    }
  }, [])

  const clearValues = () => {
    setValues(initialValues)
  }

  const editSuccess = () => {
    navigate(`/places/${editingId}`)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const { name, location, image, description } = values
    if (!name || !location || !image || !description) {
      displayAlert()
      return
    }
    if (isEditing) {
      editPlace(values, clearValues, editSuccess)
      return
    }
    createNewPlace(values, clearValues)
  }

  return (
    <Wrapper>
      <h1>{isEditing ? 'Edit Place' : 'Add New Place'}</h1>
      <form onSubmit={handleSubmit} className="form">
        {showAlert && <Alert />}
        <div className="form-row">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input
            className="form-input"
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label className="form-label" htmlFor="location">
            Location
          </label>
          <input
            className="form-input"
            type="text"
            name="location"
            value={values.location}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label className="form-label" htmlFor="image">
            Image
          </label>
          <input
            className="form-input"
            type="text"
            name="image"
            value={values.image}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label className="form-label" htmlFor="description">
            Description
          </label>
          <textarea
            className="form-input description"
            type="text"
            name="description"
            value={values.description}
            onChange={handleChange}
          />
        </div>
        <button disabled={isLoading} className="btn btn-block">
          Submit
        </button>
      </form>
    </Wrapper>
  )
}

export default NewPlace
