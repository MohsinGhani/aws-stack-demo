import {
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  IS_LOGGED_IN,
  IS_LOGGED_IN_SUCCESS,
  IS_LOGGED_IN_FAILURE,
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
  CHANGE_NEW_PASSWORD,
  CHANGE_NEW_PASSWORD_SUCCESS,
  CHANGE_NEW_PASSWORD_FAILURE,
  CHANGE_EMAIL,
  CHANGE_EMAIL_SUCCESS,
  CHANGE_EMAIL_FAILURE,
} from "../constants";

export default class authAction {
  ////////////////////////  CONFIRM NEW PASSWORD  ////////////////////
  static confirmNewPassword(payload) {
    return {
      type: CONFIRM_NEW_PASSWORD,
      payload,
    };
  }

  static confirmNewPasswordSuccess(payload) {
    return {
      type: CONFIRM_NEW_PASSWORD_SUCCESS,
      payload,
    };
  }

  static confirmNewPasswordFailure(error) {
    return {
      type: CONFIRM_NEW_PASSWORD_FAILURE,
      error,
    };
  }

  ////////////////////////  CONFIRMATION_CODE  ////////////////////
  static confirmCode(payload) {
    return {
      type: CONFIRMATION_CODE,
      payload,
    };
  }
  static confirmCodeSuccess(payload) {
    return {
      type: CONFIRMATION_CODE_SUCCESS,
      payload,
    };
  }
  static confirmCodeFailure(error) {
    return {
      type: CONFIRMATION_CODE_FAILURE,
      error,
    };
  }

  ////////////////////////  FORGOT PASSWORD  ////////////////////
  static forgotPassword(payload) {
    return {
      type: FORGOT_PASSWORD,
      payload,
    };
  }
  static forgotPasswordSuccess(payload) {
    return {
      type: FORGOT_PASSWORD_SUCCESS,
      payload,
    };
  }
  static forgotPasswordFailure(error) {
    return {
      type: FORGOT_PASSWORD_FAILURE,
      error,
    };
  }

  ////////////////////////  RESENDCODE  ////////////////////
  static resendCode(payload) {
    return {
      type: RESEND_CODE,
      payload,
    };
  }
  static resendCodeSuccess(payload) {
    return {
      type: RESEND_CODE_SUCCESS,
      payload,
    };
  }
  static resendCodeFailure(error) {
    return {
      type: RESEND_CODE_FAILURE,
      error,
    };
  }
  ////////////////////////  SIGNIN  ////////////////////
  static signIn(payload) {
    return {
      type: SIGNIN,
      payload,
    };
  }
  static signInSuccess(payload) {
    return {
      type: SIGNIN_SUCCESS,
      payload,
    };
  }
  static signInFailure(error) {
    return {
      type: SIGNIN_FAILURE,
      error,
    };
  }

  ////////////////////////  SIGNIN  ////////////////////
  static signup(payload) {
    return {
      type: SIGNUP,
      payload,
    };
  }
  static signupSuccess(payload) {
    return {
      type: SIGNUP_SUCCESS,
      payload,
    };
  }
  static signupFailure(error) {
    return {
      type: SIGNUP_FAILURE,
      error,
    };
  }

  ////////////////////////  LOGIN  ////////////////////
  static login(payload) {
    return {
      type: LOGIN,
      payload,
    };
  }

  static loginSuccess(payload) {
    return {
      type: LOGIN_SUCCESS,
      payload,
    };
  }

  static loginFailure(error) {
    return {
      type: LOGIN_FAILURE,
      error,
    };
  }

  ////////////////////////  LOGOUT  ////////////////////
  static logout(payload) {
    return {
      type: LOGOUT,
      payload,
    };
  }
  static logoutSuccess(payload) {
    return {
      type: LOGOUT_SUCCESS,
      payload,
    };
  }
  static logoutFailure(error) {
    return {
      type: LOGOUT_FAILURE,
      error,
    };
  }

  ////////////////////////  IS_LOGGED_IN  ////////////////////
  static isLoggedIn(payload) {
    return {
      type: IS_LOGGED_IN,
      payload,
    };
  }
  static isLoggedInSuccess(payload) {
    return {
      type: IS_LOGGED_IN_SUCCESS,
      payload,
    };
  }
  static isLoggedInFailure(error) {
    return {
      type: IS_LOGGED_IN_FAILURE,
      error,
    };
  }

  ////////////////////////  CHANGE NEW PASSWORD  ////////////////////
  static changePassword(payload) {
    return {
      type: CHANGE_NEW_PASSWORD,
      payload,
    };
  }

  static changeNewPasswordSuccess(payload) {
    return {
      type: CHANGE_NEW_PASSWORD_SUCCESS,
      payload,
    };
  }

  static changeNewPasswordFailure(error) {
    return {
      type: CHANGE_NEW_PASSWORD_FAILURE,
      error,
    };
  }

  ////////////////////////  CHANGE EMAIL  ////////////////////
  static changeEmail(payload) {
    return {
      type: CHANGE_EMAIL,
      payload,
    };
  }

  static changeEmailSuccess(payload) {
    return {
      type: CHANGE_EMAIL_SUCCESS,
      payload,
    };
  }

  static changeEmailFailure(error) {
    return {
      type: CHANGE_EMAIL_FAILURE,
      error,
    };
  }
}
