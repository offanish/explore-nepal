import React, { useReducer, useContext, useCallback } from 'react'
import axios from 'axios'
import reducer from './reducer'
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  CREATE_PLACE_BEGIN,
  CREATE_PLACE_SUCCESS,
  CREATE_PLACE_ERROR,
  GET_PLACES_BEGIN,
  GET_PLACES_SUCCESS,
  GET_PLACES_ERROR,
  NAVIGATE_PAGE,
  DELETE_PLACE_BEGIN,
  DELETE_PLACE_SUCCESS,
  DELETE_PLACE_ERROR,
  SET_EDIT_PLACE,
  EDIT_PLACE_BEGIN,
  EDIT_PLACE_SUCCESS,
  EDIT_PLACE_ERROR,
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

  const createNewPlace = async (place, clearValues) => {
    try {
      dispatch({ type: CREATE_PLACE_BEGIN })
      await axios.post('/api/places', place, {
        headers: { authorization: `Bearer ${state.token}` },
      })
      dispatch({ type: CREATE_PLACE_SUCCESS })
      clearValues()
    } catch (error) {
      dispatch({
        type: CREATE_PLACE_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const getAllPlaces = async () => {
    try {
      dispatch({ type: GET_PLACES_BEGIN })
      const { data: allPlaces } = await axios.get('/api/places')
      dispatch({ type: GET_PLACES_SUCCESS, payload: allPlaces })
    } catch (error) {
      dispatch({ type: GET_PLACES_ERROR })
    }
  }

  const deletePlace = async (id, deleteSuccess) => {
    try {
      dispatch({ type: DELETE_PLACE_BEGIN })
      await axios.delete(`/api/places/${id}`, {
        headers: { authorization: `Bearer ${state.token}` },
      })
      deleteSuccess()
      dispatch({ type: DELETE_PLACE_SUCCESS })
    } catch (error) {
      dispatch({
        type: DELETE_PLACE_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const setEditPlace = (id) => {
    dispatch({ type: SET_EDIT_PLACE, payload: { editingId: id } })
  }

  const editPlace = async (newPlace, clearValues, editSuccess) => {
    try {
      dispatch({ type: EDIT_PLACE_BEGIN })
      await axios.patch(`/api/places/${state.editingId}`, newPlace, {
        headers: { authorization: `Bearer ${state.token}` },
      })
      dispatch({ type: EDIT_PLACE_SUCCESS })
      clearValues()
      getAllPlaces()
      editSuccess()
    } catch (error) {
      dispatch({
        type: EDIT_PLACE_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
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
        displayAlert,
        createNewPlace,
        getAllPlaces,
        navigatePage,
        editPlace,
        deletePlace,
        setEditPlace,
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
