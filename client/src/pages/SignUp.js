import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Wrapper from '../assets/wrappers/NewPlace'
import Alert from '../components/Alert'
import { useMainContext } from '../context/MainContext'

const initialValues = {
  name: '',
  email: '',
  password: '',
}

const SignUp = () => {
  const {
    isRegistered,
    showAlert,
    isLoading,
    displayAlert,
    toggleIsRegistered,
    registerUser,
    loginUser,
    user,
  } = useMainContext()

  const navigate = useNavigate()

  const [values, setValues] = useState(initialValues)

  const clearValues = () => {
    setValues(initialValues)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const { name, email, password } = values
    if (!email || !password || (!isRegistered && !name)) {
      return displayAlert()
    }
    if (!isRegistered) {
      return registerUser(values, clearValues)
    }
    if (isRegistered) {
      return loginUser(values, clearValues)
    }
  }
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/places')
      }, 3000)
    }
  })

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
        <button disabled={isLoading} className="btn btn-block">
          {isRegistered ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </Wrapper>
  )
}

export default SignUp
