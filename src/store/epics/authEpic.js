import { Observable } from "rxjs/Rx";
import { authAction } from "../action/index";
import {
  SIGNUP,
  CONFIRMATION_CODE,
  SIGNIN,
  LOGOUT,
  IS_LOGGED_IN,
} from "../constants";
import {
  signup,
  confirm,
  login,
  isLoggedIn,
  logout,
} from "../../services/AuthService";
import { toast } from "react-toastify";
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
            authAction.signInSuccess(res)
          );
        })
        .catch((error) => {
          let { message } = error;
          toast.error(message);
          return Observable.of(authAction.signInFailure(message));
        });
    });

  static confirmCode = (action$) =>
    action$.ofType(CONFIRMATION_CODE).switchMap(({ payload }) => {
      const { email, confirmationCode, history } = payload;
      return Observable.fromPromise(confirm(email, confirmationCode))
        .switchMap((res) => {
          history.push('/')
          return Observable.of(authAction.confirmCodeSuccess(res));
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
              authAction.isLoggedInSuccess(res)
            );
          }
        });
    });

  static logout = (action$) =>
    action$.ofType(LOGOUT).switchMap(({ payload }) => {
      return Observable.fromPromise(logout())
        .switchMap((res) => {
          return Observable.of(
            authAction.logoutSuccess(res),
            authAction.isLoggedIn(),
          );
        })
        .catch((error) => {
          return Observable.of(authAction.logoutFailure(JSON.stringify(error)));
        });
    });
}
