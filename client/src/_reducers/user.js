import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE } from '../_sagas/types'

const initialState = {
  loginUserLoading: false,
  loginUserDone: false,
  loginUserError: null,
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
    default:
      return {
        ...state
      }
  }
}

export default user;