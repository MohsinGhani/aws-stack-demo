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
  RESEND_CODE,
  RESEND_CODE_SUCCESS,
  RESEND_CODE_FAILURE,
  CONFIRMATION_CODE,
  CONFIRMATION_CODE_SUCCESS,
  CONFIRMATION_CODE_FAILURE,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  CONFIRM_NEW_PASSWORD,
  CONFIRM_NEW_PASSWORD_SUCCESS,
  CONFIRM_NEW_PASSWORD_FAILURE,
  LOGOUT_SUCCESS,
  CHANGE_NEW_PASSWORD,
  CHANGE_NEW_PASSWORD_SUCCESS,
  CHANGE_NEW_PASSWORD_FAILURE,
  CHANGE_EMAIL,
  CHANGE_EMAIL_SUCCESS,
  CHANGE_EMAIL_FAILURE,
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

  resendCode: null,
  resendCodeLoader: false,
  resendCodeError: null,

  confirmationCode: null,
  confirmationCodeLoader: false,
  confirmationCodeError: null,

  forgotPassword: null,
  forgotPasswordLoader: false,
  forgotPasswordError: null,

  confirmNewPassword: null,
  confirmNewPasswordLoader: false,
  confirmNewPasswordError: null,

  getVolunteerById: null,
  getVolunteerByIdLoader: false,
  getVolunteerByIdError: null,

  changeNewPassword: null,
  changeNewPasswordLoader: false,
  changeNewPasswordError: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    ////////////////////////// CONFIRM NEW PASSWORD /////////////////////
    case CONFIRM_NEW_PASSWORD:
      return {
        ...state,
        confirmNewPassword: null,
        confirmNewPasswordLoader: true,
        confirmNewPasswordError: null,
      };

    case CONFIRM_NEW_PASSWORD_SUCCESS:
      return {
        ...state,
        confirmNewPassword: action.payload,
        confirmNewPasswordLoader: false,
        confirmNewPasswordError: null,
      };

    case CONFIRM_NEW_PASSWORD_FAILURE:
      return {
        ...state,
        confirmNewPassword: null,
        confirmNewPasswordLoader: false,
        confirmNewPasswordError: action.error,
      };

    ////////////////////////// RESEND CODE /////////////////////
    case FORGOT_PASSWORD:
      return {
        ...state,
        forgotPassword: null,
        forgotPasswordLoader: true,
        forgotPasswordError: null,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPassword: action.payload,
        forgotPasswordLoader: false,
        forgotPasswordError: null,
      };

    case FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        forgotPassword: null,
        forgotPasswordLoader: false,
        forgotPasswordError: action.error,
      };

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

    ////////////////////////// RESEND_CODE /////////////////////
    case RESEND_CODE:
      return {
        ...state,
        resendCode: null,
        resendCodeLoader: true,
        resendCodeError: null,
      };

    case RESEND_CODE_SUCCESS:
      return {
        ...state,
        resendCode: action.payload,
        resendCodeLoader: false,
        resendCodeError: null,
      };

    case RESEND_CODE_FAILURE:
      return {
        ...state,
        resendCode: null,
        resendCodeLoader: false,
        resendCodeError: action.error,
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
        // user: action.payload,

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
        // user: action.payload,
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

    ////////////////////////// CHANGE NEW PASSWORD /////////////////////
    case CHANGE_NEW_PASSWORD:
      return {
        ...state,
        changeNewPassword: null,
        changeNewPasswordLoader: true,
        changeNewPasswordError: null,
      };
    case CHANGE_NEW_PASSWORD_SUCCESS:
      return {
        ...state,
        changeNewPassword: action.payload,
        changeNewPasswordLoader: false,
        changeNewPasswordError: null,
      };
    case CHANGE_NEW_PASSWORD_FAILURE:
      return {
        ...state,
        changeNewPassword: null,
        changeNewPasswordLoader: false,
        changeNewPasswordError: action.error,
      };

    ////////////////////////// CHANGE EMAIL /////////////////////
    case CHANGE_EMAIL:
      return {
        ...state,
        changeEmail: null,
        changeEmailLoader: true,
        changeEmailError: null,
      };
    case CHANGE_EMAIL_SUCCESS:
      return {
        ...state,
        changeEmail: action.payload,
        changeEmailLoader: false,
        changeEmailError: null,
      };
    case CHANGE_EMAIL_FAILURE:
      return {
        ...state,
        changeEmail: null,
        changeEmailLoader: false,
        changeEmailError: action.error,
      };

    default:
      return state;
  }
}
