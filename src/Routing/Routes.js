import React from "react";
import { Switch, Route } from "react-router-dom";
import AuthenticatedRoute from "./AuthenticatedRoute";

import {
  SignIn,
  SignUp,
  EmailConfirmation
} from "../components/view/index";

export default ({ childProps }) => {

  return (
    <Switch>
      <AuthenticatedRoute exact path="/" component={<h1>Hello</h1>} props={childProps} />
      <Route
        exact
        path="/email-confirmation"
        component={EmailConfirmation}
        props={childProps}
      />
      <Route
        exact
        path="/signin"
        component={SignIn}
        props={childProps}
      />
      <Route
        exact
        path="/signup"
        component={SignUp}
        props={childProps}
      />
    </Switch>
  );
};
