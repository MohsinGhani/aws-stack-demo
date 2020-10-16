//not inuse at the moment due to problem in pass regex
import React from "react";
import * as Yup from "yup";

const emailConfirmationFormValidation = Yup.object().shape({
  confirmationCode: Yup.string()
    .required("Confirmation code is required.")
});

export default emailConfirmationFormValidation;
