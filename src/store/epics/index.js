import { combineEpics } from "redux-observable";
import authEpic from "./authEpic";

const rootEpic = combineEpics(
  authEpic.signup,
  authEpic.confirmCode,
  authEpic.signIn,
  authEpic.logout,
  authEpic.isLoggedIn
);

export default rootEpic;
