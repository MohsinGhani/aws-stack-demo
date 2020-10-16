import { combineEpics } from "redux-observable";
import authEpic from "./authEpic";

const rootEpic = combineEpics(
  authEpic.signup,
  authEpic.resendCode,
  authEpic.confirmCode,
  authEpic.signIn,
  authEpic.logout,
  authEpic.isLoggedIn,
  authEpic.forgotPassword,
  authEpic.confirmNewPassword,
  authEpic.changeNewPassword,
  authEpic.changeEmail
);

export default rootEpic;
