import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import ClipLoader from 'react-spinners/ClipLoader'

import { useMainContext } from '../context/MainContext'
import Alert from '../components/Alert'
import Wrapper from '../assets/wrappers/NewPlace'
import { loginUser, registerUser } from '../api/authAPI'
import {
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_SUCCESS,
} from '../context/actions'

const initialValues = {
  name: '',
  email: '',
  password: '',
}

const SignUp = () => {
  const {
    isRegistered,
    showAlert,
    displayAlert,
    toggleIsRegistered,
    user,
    dispatch,
    clearAlert,
  } = useMainContext()

  const navigate = useNavigate()

  const [values, setValues] = useState(initialValues)

  const clearValues = () => {
    setValues(initialValues)
  }
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }
  //login user mutation
  const { mutate: loginUserMutation, isLoading: isLoggingIn } = useMutation(
    (user) => loginUser(user),
    {
      onSuccess: (data) => {
        dispatch({ type: LOGIN_USER_SUCCESS, payload: { user: data.user } })
        navigate('/places')
        clearAlert()
      },
      onError: (error) => {
        dispatch({
          type: LOGIN_USER_ERROR,
          payload: { msg: error.response.data.msg },
        })
        clearAlert()
      },
    }
  )
  //register user mutation
  const { mutate: registerUserMutation, isLoading: isRegistering } =
    useMutation((user) => registerUser(user), {
      onSuccess: (data) => {
        dispatch({ type: REGISTER_USER_SUCCESS, payload: { user: data.user } })
        navigate('/places')
        clearAlert()
      },
      onError: (error) => {
        dispatch({
          type: LOGIN_USER_ERROR,
          payload: { msg: error.response.data.msg },
        })
        clearAlert()
      },
    })

  const handleSubmit = (event) => {
    event.preventDefault()
    const { name, email, password } = values
    if (!email || !password || (!isRegistered && !name)) {
      return displayAlert()
    }
    if (!isRegistered) {
      return registerUserMutation(values)
    }
    if (isRegistered) {
      return loginUserMutation(values)
    }
  }

  return (
    <Wrapper signUp>
      <h1>{isRegistered ? 'Sign In' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit} className="form">
        {showAlert && <Alert />}
        {!isRegistered && (
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
        )}
        <div className="form-row">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            className="form-input"
            type="text"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            className="form-input"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
        </div>
        <p>
          {isRegistered ? 'Already registered?' : 'Not registered yet?'}
          {
            <button
              type="button"
              onClick={() => {
                toggleIsRegistered()
                clearValues()
              }}
              className="registered-btn"
            >
              {isRegistered ? 'Sign Up' : 'Sign In'}
            </button>
          }
        </p>
        <button
          disabled={isLoggingIn || isRegistering}
          className="btn btn-block"
        >
          {isLoggingIn || isRegistering ? (
            <ClipLoader color="#ffffff" size="1rem" />
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
