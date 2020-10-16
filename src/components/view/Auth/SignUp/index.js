import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field } from "formik";
import signupFormValidation from "./Validation";
import { useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { authAction } from "../../../../store/action";

const SignUp = () => {
  const { signup, signupLoader } = useSelector(
    ({ authReducer }) => authReducer
  );
  const dispatch = useDispatch();
  const history = useHistory();

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const prevProps = usePrevious({
    signupLoader,
  });

  useEffect(() => {
    if (signup && prevProps && prevProps.signupLoader && !signupLoader)
      history.replace("/email-confirmation");
  }, [history, signup, prevProps, signupLoader]);

  return (

    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
      }}
      validationSchema={signupFormValidation}
      onSubmit={(values) => {
        dispatch(authAction.signup({ ...values, role: "VOLUNTEER" }));
      }}
    >
      {({ errors, touched, handleChange, handleBlur, handleSubmit }) => (
        <Form onSubmit={(e) => e.preventDefault()} autoComplete="off">
          <Field type="text" name="username" placeholder="username" />
          <Field type="email" name="email" placeholder="email" />
          <Field type="password" name="password" placeholder="password" />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;
