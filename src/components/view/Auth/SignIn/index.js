import React, { useEffect, useRef } from "react";
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
      {_ => (
        <Form>
          <Field type="email" name="email" placeholder="email" />
          <Field type="password" name="password" placeholder="password" />
          <button type="submit" disabled={signInLoader}>{signInLoader ? '...loading' : 'Submit'}</button>
        </Form>
      )}
    </Formik>
  );
};

export default SignIn;
