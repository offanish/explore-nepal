import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ClipLoader from 'react-spinners/ClipLoader'
import { displayAlertThunk, setUpdatedUser } from '../state/globalSlice'
import Wrapper from '../assets/wrappers/NewPlace'
import Alert from '../components/Alert'
import { useUpdateUserMutation } from '../state/apiSlice'

const initialValues = { name: '', email: '', password: '', confirmPassword: '' }

const NewPlace = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { showAlert, user } = useSelector((state) => state.global)
  const [values, setValues] = useState(initialValues)

  const handleChange = (event) => {
    setValues((values) => {
      return { ...values, [event.target.name]: event.target.value }
    })
  }

  const clearValues = () => {
    setValues(initialValues)
  }

  const [updateUser, { isLoading }] = useUpdateUserMutation()

  useEffect(() => {
    if (!user) {
      navigate('/places')
      return
    }
    setValues((prevValues) => ({
      ...prevValues,
      name: user?.name,
      email: user?.email,
    }))
  }, [navigate, user])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { name, email, password, confirmPassword } = values
      if (!name || !email || !password || !confirmPassword) {
        dispatch(
          displayAlertThunk({
            alertText: 'Please fill all the fields',
            alertType: 'danger',
          })
        )
        return
      }
      if (password !== confirmPassword) {
        dispatch(
          displayAlertThunk({
            alertText: 'Passwords do not match',
            alertType: 'danger',
          })
        )
        return
      }
      const data = await updateUser(values).unwrap()
      dispatch(setUpdatedUser({ user: data }))
      dispatch(
        displayAlertThunk({
          alertText: 'Updated user successfully',
          alertType: 'success',
        })
      )
      navigate('/profile')
      clearValues()
    } catch (error) {
      dispatch(
        displayAlertThunk({ alertText: error.data.msg, alertType: 'danger' })
      )
    }
  }
  return (
    <Wrapper>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit} className='form'>
        {showAlert && <Alert />}
        <div className='form-row'>
          <label className='form-label' htmlFor='name'>
            Name
          </label>
          <input
            className='form-input'
            id='name'
            type='text'
            name='name'
            value={values.name}
            onChange={handleChange}
          />
        </div>
        <div className='form-row'>
          <label className='form-label' htmlFor='email'>
            Email
          </label>
          <input
            className='form-input'
            id='email'
            type='email'
            name='email'
            value={values.email}
            onChange={handleChange}
          />
        </div>
        <div className='form-row'>
          <label className='form-label' htmlFor='password'>
            Password
          </label>
          <input
            className='form-input'
            id='password'
            type='password'
            name='password'
            value={values.password}
            onChange={handleChange}
          />
        </div>
        <div className='form-row'>
          <label className='form-label' htmlFor='confirmPassword'>
            Confirm Password
          </label>
          <input
            className='form-input'
            id='confirmPassword'
            type='password'
            name='confirmPassword'
            value={values.confirmPassword}
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
