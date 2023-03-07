import { createSlice } from '@reduxjs/toolkit'

const userFromStorage = JSON.parse(localStorage.getItem('user')) || null
const tokenFromStorage = localStorage.getItem('token') || null

const initialState = {
  alertType: '',
  alertText: '',
  showAlert: false,
  user: userFromStorage,
  token: tokenFromStorage,
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    displayAlert: (state, action) => {
      state.showAlert = true
      state.alertType = action.payload.alertType
      state.alertText = action.payload.alertText
    },
    clearAlert: (state) => {
      state.showAlert = false
      state.alertType = ''
      state.alertText = ''
    },
    setUser: (state, action) => {
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      state.user = action.payload.user
      state.token = action.payload.token
    },
    logout: (state) => {
      localStorage.clear()
      state.user = null
      state.token = null
    },
  },
})

export const { displayAlert, clearAlert, setUser, logout } = globalSlice.actions
export default globalSlice.reducer

export const displayAlertThunk =
  ({ alertText, alertType }) =>
  (dispatch) => {
    dispatch(displayAlert({ alertType, alertText }))
    setTimeout(() => {
      dispatch(clearAlert())
    }, 3000)
  }
