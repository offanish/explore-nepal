import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ClipLoader from 'react-spinners/ClipLoader'

import Alert from '../components/Alert'
import Wrapper from '../assets/wrappers/NewPlace'

import { useLoginMutation, useRegisterMutation } from '../state/apiSlice'
import { displayAlertThunk, setUser } from '../state/globalSlice'

const initialValues = {
  name: '',
  email: '',
  password: '',
}

const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { showAlert, user } = useSelector((state) => state.global)

  const [values, setValues] = useState(initialValues)
  const [isRegistered, setIsRegistered] = useState(true)

  const clearValues = () => {
    setValues(initialValues)
  }
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }

  useEffect(() => {
    if (user) {
      navigate('/places')
    }
  }, [user, navigate])

  const [login, { isLoading: isLoggingIn }] = useLoginMutation()
  const [register, { isLoading: isRegistering }] = useRegisterMutation()

  const handleSubmit = (event) => {
    event.preventDefault()
    const { name, email, password } = values
    if (!email || !password || (!isRegistered && !name)) {
      dispatch(
        displayAlertThunk({
          alertText: 'Please fill the required fields',
          alertType: 'danger',
        })
      )
      return
    }
    if (!isRegistered) {
      register(values)
        .unwrap()
        .then((data) => {
          dispatch(setUser(data))
          dispatch(
            displayAlertThunk({
              alertText: 'Registered Successfully',
              alertType: 'success',
            })
          )
          navigate('/')
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
    if (isRegistered) {
      login(values)
        .unwrap()
        .then((data) => {
          dispatch(setUser(data))
          dispatch(
            displayAlertThunk({
              alertText: 'Logged In Successfully',
              alertType: 'success',
            })
          )
          navigate('/')
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
  }

  return (
    <Wrapper signUp>
      <h1>{isRegistered ? 'Sign In' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit} className='form'>
        {showAlert && <Alert />}
        {!isRegistered && (
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
        )}
        <div className='form-row'>
          <label className='form-label' htmlFor='email'>
            Email
          </label>
          <input
            className='form-input'
            type='text'
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
            type='password'
            name='password'
            value={values.password}
            onChange={handleChange}
          />
        </div>
        <p>
          {isRegistered ? 'Not registered yet?' : 'Already registered?'}
          {
            <button
              type='button'
              onClick={() => {
                setIsRegistered(!isRegistered)
                clearValues()
              }}
              className='registered-btn'
            >
              {isRegistered ? 'Sign Up' : 'Sign In'}
            </button>
          }
        </p>
        <button
          disabled={isLoggingIn || isRegistering}
          className='btn btn-block'
        >
          {isLoggingIn || isRegistering ? (
            <ClipLoader color='#ffffff' size='1rem' />
          ) : isRegistered ? (
            'Sign In'
          ) : (
            'Sign Up'
          )}
        </button>
      </form>
    </Wrapper>
  )
}

export default SignUp
