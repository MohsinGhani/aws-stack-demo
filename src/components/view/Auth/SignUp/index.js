import React, { useEffect, useRef } from "react";
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
        username: "mohsin",
        email: "mohsinghani.777@gmail.com",
        password: "Mohsin1!",
      }}
      validationSchema={signupFormValidation}
      onSubmit={(values) => {
        dispatch(authAction.signup({ ...values }));
      }}
    >
      {_ => (
        <center>
          <Form>
            <h3>Signup</h3>
            <Field type="text" name="username" placeholder="username" />
            <Field type="email" name="email" placeholder="email" />
            <Field type="password" name="password" placeholder="password" />
            <button type="submit">Signup</button>
            <button type="button" onClick={() => history.push('/signin')}>{'Signin'}</button>
          </Form>
        </center>
      )}
    </Formik>
  );
};

export default SignUp;
