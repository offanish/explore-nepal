import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  CREATE_PLACE_SUCCESS,
  CREATE_PLACE_ERROR,
  GET_PLACES_ERROR,
  DELETE_PLACE_SUCCESS,
  DELETE_PLACE_ERROR,
  NAVIGATE_PAGE,
  EDIT_PLACE_SUCCESS,
  EDIT_PLACE_ERROR,
  TOGGLE_IS_REGISTERED,
  GET_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
} from './actions'

const reducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: 'danger',
        alertText: 'Please fill all required fields',
      }

    case CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
        alertType: '',
        alertText: '',
      }
    case NAVIGATE_PAGE:
      return {
        ...state,
        showAlert: false,
        alertText: '',
        alertType: '',
        isLoading: false,
        isEditing: false,
        editingId: '',
      }
    case CREATE_PLACE_SUCCESS:
      return {
        ...state,
        showAlert: true,
        alertType: 'success',
        alertText: 'Place added successfully',
      }
    case CREATE_PLACE_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    case GET_PLACES_ERROR:
      return {
        ...state,
        showAlert: true,
        alertType: 'danger',
        alertText:
          "Couldn't load places. Please try again later and refresh the page",
      }
    case DELETE_PLACE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'Place deleted successfully',
      }
    case DELETE_PLACE_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    case EDIT_PLACE_SUCCESS:
      return {
        ...state,
        showAlert: true,
        alertType: 'success',
        alertText: 'Edited place successfully',
      }
    case EDIT_PLACE_ERROR:
      return {
        ...state,
        isLoading: false,
        isEditing: false,
        editingId: '',
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    case TOGGLE_IS_REGISTERED:
      return {
        ...state,
        isRegistered: !state.isRegistered,
      }
    case GET_USER:
      return {
        ...state,
        user: action.payload.user,
      }
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        showAlert: true,
        alertType: 'success',
        alertText: 'User Created Successfully',
        user: action.payload.user,
      }
    case REGISTER_USER_ERROR:
      return {
        ...state,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        showAlert: true,
        alertType: 'success',
        alertText: 'Logged In Successfully',
        user: action.payload.user,
      }
    case LOGIN_USER_ERROR:
      return {
        ...state,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    case LOGOUT_USER:
      return {
        ...state,
        showAlert: true,
        alertType: 'success',
        alertText: action.payload.msg,
        user: null,
      }
    default:
      return { ...state }
  }
}
export default reducer
