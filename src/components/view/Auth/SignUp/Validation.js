//not inuse at the moment due to problem in pass regex
import React from "react";
import * as Yup from "yup";

const signupFormValidation = Yup.object().shape({
  username: Yup.string()
    .max(300, "Username should be less than 300 characters.")
    .required("User name is required."),

  email: Yup.string()
    .email("Email must be valid")
    .max(300, "Email should be less than 300 characters.")
    .required("Email is required."),

  password: Yup.string()
    .label("Password")
    .required("Password is required.")
    .min(8, "Password should contain atleast 8 characters.")
    .max(300, "Password should be less than 300 characters."),
});

export default signupFormValidation;
