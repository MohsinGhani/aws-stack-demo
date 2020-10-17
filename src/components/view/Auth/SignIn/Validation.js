//not inuse at the moment due to problem in pass regex
import * as Yup from "yup";

const SignInFormValidation = Yup.object().shape({
  email: Yup.string()
    .email("Email must be valid")
    .max(300, "Email should be less than 300 characters.")
    .required("Email is required."),

  password: Yup.string()
    .label("Password")
    .required("Password is required.")
    .min(8, "Password should contain atleast 8 characters.")
    .max(300, "Password should be less than 300 characters.")
  // .matches(
  //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  //   <FormattedMessage
  //     id="signUpPage.inputPassword.errorMsg.invalid"
  //     defaultMessage="Bitte geben Sie ein Passwort ein, das mindestens 8 Zeichen hat. Davon mindestens eine Zahl, einen Buchstaben und ein Sonderzeichen."
  //   />
  // )
});

export default SignInFormValidation;
