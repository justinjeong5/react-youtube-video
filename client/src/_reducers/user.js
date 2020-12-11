import {
  LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE,
  REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE,
} from '../_sagas/types'

const initialState = {
  loginUserLoading: false,
  loginUserDone: false,
  loginUserError: null,
  registerUserLoading: false,
  registerUserDone: false,
  registerUserError: null,
  loginUser: null,
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loginUserLoading: true,
        loginUserDone: false,
        loginUserError: null,
      }
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loginUserLoading: false,
        loginUserDone: true,
        loginUser: action.payload
      }
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        loginUserError: action.error
      }
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        registerUserLoading: true,
        registerUserDone: false,
        registerUserError: null,
      }
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        registerUserLoading: false,
        registerUserDone: true,
      }
    case REGISTER_USER_FAILURE:
      return {
        ...state,
        registerUserError: action.error
      }
    default:
      return {
        ...state
      }
  }
}

export default user;