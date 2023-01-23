import React, { useReducer, useContext } from 'react'
import axios from 'axios'
import reducer from './reducer'
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  NAVIGATE_PAGE,
  TOGGLE_IS_REGISTERED,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
} from './actions'

const user = localStorage.getItem('user')
const token = localStorage.getItem('token')

const MainContext = React.createContext()
const initialState = {
  showAlert: false,
  alertType: '',
  alertText: '',
  isLoading: false,
  isEditing: false,
  editingId: '',
  allPlaces: [],
  isRegistered: false,
  token: token,
  user: JSON.parse(user) || null,
}
export const MainContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }
  const navigatePage = () => {
    dispatch({ type: NAVIGATE_PAGE })
  }

  const toggleIsRegistered = () => {
    dispatch({ type: TOGGLE_IS_REGISTERED })
  }

  const addUserToLocalStorage = (user, token) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  }

  const removeUserFromLocalStorage = (user, token) => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const registerUser = async (newUser, clearValues) => {
    try {
      dispatch({ type: REGISTER_USER_BEGIN })
      const { data } = await axios.post('/api/auth/register', newUser)
      const { user, token } = data
      dispatch({ type: REGISTER_USER_SUCCESS, payload: { user, token } })
      addUserToLocalStorage(user, token)
      clearValues()
    } catch (error) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }
  const loginUser = async (newUser, clearValues) => {
    try {
      dispatch({ type: LOGIN_USER_BEGIN })
      const { data } = await axios.post('/api/auth/login', newUser)
      const { user, token } = data
      dispatch({ type: LOGIN_USER_SUCCESS, payload: { user, token } })
      addUserToLocalStorage(user, token)
      clearValues()
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
    clearAlert()
  }

  return (
    <MainContext.Provider
      value={{
        ...state,
        dispatch,
        displayAlert,
        clearAlert,
        navigatePage,
        toggleIsRegistered,
        registerUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </MainContext.Provider>
  )
}

export const useMainContext = () => {
  return useContext(MainContext)
}
