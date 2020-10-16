import React, { useEffect, useRef } from "react";
import { authAction } from "./../../../../store/action";
import { Formik, Field } from "formik";
import emailConfirmationFormValidation from "./Validation";
import { useHistory } from "react-router-dom";
import { usePrevious } from "./../../../../services/helper";
import { useSelector, useDispatch } from "react-redux";

const EmailConfirmation = () => {
  let history = useHistory();
  const authReducer = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const {
    resendCodeLoader,
    signup,
    confirmationCodeLoader,
    signIn,
    signInLoader,
  } = authReducer;

  const prevProps = usePrevious(useRef, useEffect, {
    signInLoader,
  });

  useEffect(() => {
    if (!signup) history.replace("/signup");
  }, [signup, history]);

  useEffect(() => {
    if (signIn && prevProps && prevProps.signInLoader && !signInLoader)
      history.replace("/");
  }, [history, signIn, prevProps, signInLoader]);

  return (
    <div className="email_confirmation_container">
      <div className="body">
        <Formik
          initialValues={{
            confirmationCode: "",
          }}
          validationSchema={emailConfirmationFormValidation}
          onSubmit={(values) =>
            dispatch(
              authAction.confirmCode({ ...values, email: signup["email"] })
            )
          }
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                autoComplete="off"
              >
                <div className="wrapper">
                  <Field type="text" name="confirmationCode" placeholder="Enter Code" />
                  <button type="submit">Confirm</button>
                </div>
              </form>
            )}
        </Formik>
      </div>
    </div>
  );
};

export default EmailConfirmation;
