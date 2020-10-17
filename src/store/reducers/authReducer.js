import {
  SIGNUP,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  SIGNIN,
  SIGNIN_FAILURE,
  SIGNIN_SUCCESS,
  IS_LOGGED_IN,
  IS_LOGGED_IN_FAILURE,
  IS_LOGGED_IN_SUCCESS,
  CONFIRMATION_CODE,
  CONFIRMATION_CODE_SUCCESS,
  CONFIRMATION_CODE_FAILURE,
  LOGOUT_SUCCESS,

} from "../constants";

const initialState = {
  user: null,

  signup: null,
  signupLoader: false,
  signupError: null,

  signIn: null,
  signInLoader: false,
  signInError: null,

  isLoggedIn: false,
  isLoggedInLoader: false,
  isLoggedInError: null,


  confirmationCode: null,
  confirmationCodeLoader: false,
  confirmationCodeError: null,

};

export default function authReducer(state = initialState, action) {
  switch (action.type) {




    ////////////////////////// RESEND_CODE /////////////////////
    case CONFIRMATION_CODE:
      return {
        ...state,
        confirmationCode: null,
        confirmationCodeLoader: true,
        confirmationCodeError: null,
      };

    case CONFIRMATION_CODE_SUCCESS:
      return {
        ...state,
        confirmationCode: action.payload,
        confirmationCodeLoader: false,
        confirmationCodeError: null,
      };

    case CONFIRMATION_CODE_FAILURE:
      return {
        ...state,
        confirmationCode: null,
        confirmationCodeLoader: false,
        confirmationCodeError: action.error,
      };

    ////////////////////////// SIGNIN /////////////////////
    case SIGNIN:
      return {
        ...state,
        signIn: null,
        signInLoader: true,
        signInError: null,
      };

    case SIGNIN_SUCCESS:
      return {
        ...state,
        user: action.payload['attributes'],

        signIn: action.payload,
        signInLoader: false,
        signInError: null,

        isLoggedIn: true,
        isLoggedInLoader: false,
        isLoggedInError: null,
      };

    case SIGNIN_FAILURE:
      return {
        ...state,
        signIn: null,
        signInLoader: false,
        signInError: action.error,
      };

    ////////////////////////// SIGNUP /////////////////////
    case SIGNUP:
      return {
        ...state,
        signup: null,
        signupLoader: true,
        signupError: null,
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        // user: action.payload,
        signup: action.payload,
        signupLoader: false,
        signupError: null,
      };

    case SIGNUP_FAILURE:
      return {
        ...state,
        signup: null,
        signupLoader: false,
        signupError: action.error,
      };

    ////////////////////////// IS_LOGGED_IN /////////////////////
    case IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: null,
        isLoggedInLoader: true,
        isLoggedInError: null,
      };
    case IS_LOGGED_IN_SUCCESS:
      return {
        ...state,
        user: action.payload['attributes'],
        isLoggedIn: true,
        isLoggedInLoader: false,
        isLoggedInError: null,
      };
    case IS_LOGGED_IN_FAILURE:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        isLoggedInLoader: false,
        isLoggedInError: action.error,
      };

    ////////////////////////// SIGNOUT /////////////////////
    case LOGOUT_SUCCESS:
      state = initialState;
      return state;

    default:
      return state;
  }
}
