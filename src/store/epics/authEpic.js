import { Observable } from "rxjs/Rx";
import { authAction } from "../action/index";
import {
  SIGNUP,
  RESEND_CODE,
  CONFIRMATION_CODE,
  SIGNIN,
  LOGOUT,
  IS_LOGGED_IN,
  FORGOT_PASSWORD,
  CONFIRM_NEW_PASSWORD,
  CHANGE_NEW_PASSWORD,
  CHANGE_EMAIL,
} from "../constants";
import {
  signup,
  resendSignUp,
  confirm,
  login,
  isLoggedIn,
  logout,
  forgotPassword,
  confirmNewPassword,
  changeNewPassword,
  changeEmail,
} from "../../services/AuthService";
import { toast } from "react-toastify";
import store from "../store.js";

export default class authEpic {
  static signup = (action$) =>
    action$.ofType(SIGNUP).switchMap(({ payload }) => {
      const { email, password, username } = payload;
      // with common attributes
      const requestPayload = {
        email,
        password,
        name: username,
      };

      return Observable.fromPromise(signup(requestPayload))
        .switchMap((res) => {
          return Observable.of(authAction.signupSuccess(res));
        })
        .catch((error) => {
          const { message, code } = error;
          if (code === "InvalidPasswordException") {
            toast.error(
              "Password must have at least a captial letter, a number and a symbol"
            );
            return Observable.of(
              authAction.signupFailure(
                "Password must have at least a captial letter, a number and a symbol"
              )
            );
          } else {
            toast.error(message);
            return Observable.of(authAction.signupFailure(message));
          }
        });
    });

  static signIn = (action$) =>
    action$.ofType(SIGNIN).switchMap(({ payload }) => {
      const { email, password } = payload;
      return Observable.fromPromise(login(email, password))
        .switchMap((res) => {
          return Observable.of(
            authAction.signInSuccess(res),
            authAction.getVolunteerById({
              volunteerId: res["attributes"]["sub"],
            })
          );
        })
        .catch((error) => {
          let { message } = error;
          toast.error(message);
          return Observable.of(authAction.signInFailure(message));
        });
    });

  static resendCode = (action$) =>
    action$.ofType(RESEND_CODE).switchMap(({ payload }) => {
      const { email } = payload;
      return Observable.fromPromise(resendSignUp(email))
        .switchMap((res) => {
          toast.success("Confirmation code sent.");
          return Observable.of(authAction.resendCodeSuccess(res));
        })
        .catch((error) => {
          toast.error(error);
          return Observable.of(authAction.resendCodeFailure(error));
        });
    });

  static confirmCode = (action$) =>
    action$.ofType(CONFIRMATION_CODE).switchMap(({ payload }) => {
      const { email, confirmationCode } = payload;
      return Observable.fromPromise(confirm(email, confirmationCode))
        .switchMap((res) => {
          let {
            signup: { password },
          } = store.getState().authReducer;
          return Observable.of(
            authAction.confirmCodeSuccess(res),
            authAction.signIn({ email, password })
          );
        })
        .catch((error) => {
          toast.error(error);
          return Observable.of(authAction.confirmCodeFailure(error));
        });
    });

  static isLoggedIn = (action$) =>
    action$.ofType(IS_LOGGED_IN).switchMap(() => {
      return Observable.fromPromise(isLoggedIn())
        .catch((err) => {
          return Observable.of(authAction.isLoggedInFailure(err));
        })
        .switchMap((res) => {
          if (res.type && res.type === "IS_LOGGED_IN_FAILURE") {
            return Observable.of(authAction.isLoggedInFailure(res));
          } else {
            return Observable.of(
              authAction.isLoggedInSuccess(res),
              authAction.getVolunteerById({
                volunteerId: res["attributes"]["sub"],
              })
            );
          }
        });
    });

  static forgotPassword = (action$) =>
    action$.ofType(FORGOT_PASSWORD).switchMap(({ payload }) => {
      const { email } = payload;
      return Observable.fromPromise(forgotPassword(email))
        .switchMap((data) => {
          if (data["type"] === "FORGOT_PASSWORD_FAILURE") {
            toast.error("Email not registered");
            return Observable.of(
              authAction.forgotPasswordFailure("Email not registered")
            );
          }
          return Observable.of(
            authAction.forgotPasswordSuccess({ ...data, email })
          );
        })
        .catch((error) => {
          toast.error(error);
          return Observable.of(authAction.forgotPasswordFailure(error));
        });
    });

  static confirmNewPassword = (action$) =>
    action$.ofType(CONFIRM_NEW_PASSWORD).switchMap(({ payload }) => {
      let { email, confirmationCode, password } = payload;
      return Observable.fromPromise(
        confirmNewPassword(email, confirmationCode, password)
      )
        .switchMap((res) => {
          let msg = "Passowrd has been successfully Changed!";
          toast.success(msg);
          return Observable.of(authAction.confirmNewPasswordSuccess(msg));
        })
        .catch((error) => {
          toast.error(error);
          return Observable.of(authAction.confirmNewPasswordFailure(error));
        });
    });

  static logout = (action$) =>
    action$.ofType(LOGOUT).switchMap(({ payload }) => {
      return Observable.fromPromise(logout())
        .switchMap((res) => {
          return Observable.of(authAction.logoutSuccess(res));
        })
        .catch((error) => {
          return Observable.of(authAction.logoutFailure(JSON.stringify(error)));
        });
    });

  static changeNewPassword = (action$) =>
    action$.ofType(CHANGE_NEW_PASSWORD).switchMap(({ payload }) => {
      let { oldPassword, newPassword } = payload;
      return Observable.fromPromise(changeNewPassword(oldPassword, newPassword))
        .switchMap((res) => {
          let msg = "Passowrd has been successfully Changed!";
          toast.success(msg);
          return Observable.of(authAction.changeNewPasswordSuccess(msg));
        })
        .catch((error) => {
          toast.error(error);
          return Observable.of(authAction.changeNewPasswordFailure(error));
        });
    });

  static changeEmail = (action$) =>
    action$.ofType(CHANGE_EMAIL).switchMap(({ payload }) => {
      let { email, password } = payload;
      let { user: { volunteerId } } = store.getState().authReducer;
      return Observable.fromPromise(changeEmail(email, password))
        .switchMap((res) => {
          console.log({ res })
          let msg = "Email has been successfully Changed!";
          toast.success(msg);
          return Observable.of(
            authAction.changeEmailSuccess(msg),
            authAction.getVolunteerById({ volunteerId })
          );
        })
        .catch((error) => {
          toast.error(error);
          return Observable.of(authAction.changeEmailFailure(error));
        });
    });
}
