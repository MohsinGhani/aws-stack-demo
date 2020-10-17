import React, { useEffect } from "react";
import { authAction } from "./../../../../store/action";
import { Formik, Form, Field } from "formik";
import emailConfirmationFormValidation from "./Validation";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const EmailConfirmation = () => {
  let history = useHistory();
  const authReducer = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const {
    // resendCodeLoader,
    signup,
    confirmationCodeLoader,
  } = authReducer;

  useEffect(() => {
    if (!signup) history.replace("/signup");
  }, [signup, history]);

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
              authAction.confirmCode({ ...values, email: signup["email"], history })
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
              <Form>
                <div className="wrapper">
                  <Field type="text" name="confirmationCode" placeholder="Enter Code" />
                  <button type="submit" disabled={confirmationCodeLoader}>{confirmationCodeLoader ? '...loading' : 'Confirm'}</button>
                </div>
              </Form>
            )}
        </Formik>
      </div>
    </div>
  );
};

export default EmailConfirmation;
