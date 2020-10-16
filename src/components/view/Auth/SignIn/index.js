import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { authAction } from "./../../../../store/action";
import { Formik, Form, Field } from "formik";
import SignInFormValidation from "./Validation";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const SignIn = () => {
  const { signIn, signInLoader } = useSelector(
    ({ authReducer }) => authReducer
  );
  const [iconType, setIconType] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const prevProps = usePrevious({
    signInLoader,
  });

  useEffect(() => {
    if (signIn && prevProps && prevProps.signInLoader && !signInLoader)
      history.replace("/");
  }, [history, signIn, prevProps, signInLoader]);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={SignInFormValidation}
      onSubmit={(values) => dispatch(authAction.signIn({ ...values }))}
    >
      {({ errors, touched, handleChange, handleBlur, handleSubmit }) => (
        <Form onSubmit={(e) => e.preventDefault()} autoComplete="off">
          <Field type="email" name="email" placeholder="email" />
          <Field type="password" name="password" placeholder="password" />

          <p className="forgot_password">
            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </p>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default SignIn;
