import React, { useReducer, useContext } from 'react'
import Cookies from 'js-cookie'
import { useQuery, useMutation } from 'react-query'
import reducer from './reducer'
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  NAVIGATE_PAGE,
  TOGGLE_IS_REGISTERED,
  LOGOUT_USER,
  GET_USER,
} from './actions'
import { getUser, logout } from '../api/authAPI'

const MainContext = React.createContext()
const initialState = {
  showAlert: false,
  alertType: '',
  alertText: '',
  allPlaces: [],
  isRegistered: false,
  user: null,
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

  const { mutate: logoutUser } = useMutation(logout, {
    onSuccess: () => {
      dispatch({
        type: LOGOUT_USER,
        payload: { msg: 'Logged out successfully' },
      })
      clearAlert()
    },
  })

  const { isLoading: isGettingUser } = useQuery('user', getUser, {
    staleTime: 1000 * 60 * 5,
    retry: 0,
    refetchOnWindowFocus: !!state.user,
    refetchOnReconnect: false,
    refetchOnMount: false,
    onSuccess: (data) => {
      dispatch({ type: GET_USER, payload: { user: data.user } })
    },
    onError: () => {
      if (state.user) {
        dispatch({
          type: LOGOUT_USER,
          payload: { msg: 'Login session expired' },
        })
        clearAlert()
      }
    },
  })
  return (
    <MainContext.Provider
      value={{
        ...state,
        dispatch,
        displayAlert,
        clearAlert,
        navigatePage,
        toggleIsRegistered,
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
