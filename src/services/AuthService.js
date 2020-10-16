import { Auth } from "aws-amplify";

export const signup = (user) => {
  const { email, password } = user;
  delete user.password;
  return new Promise((resolve, reject) => {
    Auth.signUp({
      username: email,
      password,
      attributes: { ...user },
    })
      .then((u) =>
        resolve({
          email: u.user.username,
          userId: u.userSub,
          verified: u.userConfirmed,
          role: user["custom:role"],
          password,
          ...user,
        })
      )
      .catch((error) => reject(error));
  });
};

export const signupWithPhone = (user) => {
  const { email, password, firstname, lastname, phone } = user;
  return new Promise((resolve, reject) => {
    Auth.signUp({
      username: email,
      password,
      attributes: {
        email, // optional
        phone_number: phone, // optional - E.164 number convention
        // other custom attributes
      },
    })
      .then((u) =>
        resolve({
          email: u.user.username,
          userId: u.userSub,
          verified: u.userConfirmed,
          firstname,
          lastname,
          phone,
          password,
        })
      )
      .catch((error) => reject(error));
  });
};

export const confirm = (email, confirmationCode) => {
  return new Promise(async (resolve, reject) => {
    Auth.confirmSignUp(email, confirmationCode)
      .then((confirmedUser) => resolve({ confirmedUser, email }))
      .catch((error) => reject(error.message));
  });
};

export const resendSignUp = (username) => {
  return new Promise(async (resolve, reject) => {
    Auth.resendSignUp(username)
      .then((data) => resolve({ data }))
      .catch((error) => reject(error.message));
  });
};

export const login = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await Auth.signIn(email, password);
      resolve(user);
    } catch (e) {
      // ALERT here we can check which error we are receiving
      reject(e);
    }
  });
};

export const logout = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await Auth.signOut({ global: true });
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

export const forgotPassword = (username) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Auth.forgotPassword(username);
      resolve(response);
    } catch (e) {
      // ALERT here we can check which error we are receiving
      reject(e.message);
    }
  });
};

export const confirmNewPassword = (username, code, newPassword) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Auth.forgotPasswordSubmit(
        username,
        code,
        newPassword
      );
      resolve(response);
    } catch (e) {
      // ALERT here we can check which error we are receiving
      reject(e.message);
    }
  });
};

export const isLoggedIn = (user, confirmationCode) => {
  return new Promise(async (resolve, reject) => {
    Auth.currentAuthenticatedUser()
      .then((user) => resolve(user))
      .catch((err) => reject(err.message));
  });
};

export const changeNewPassword = (oldPassword, newPassword) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const response = await Auth.changePassword(
        user,
        oldPassword,
        newPassword
      );
      resolve(response);
    } catch (e) {
      // ALERT here we can check which error we are receiving
      reject(e.message);
    }
  });
};

export const changeEmail = (email, passowrd) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const response = await Auth.updateUserAttributes(user, { email: email });
      resolve(response);
    } catch (e) {
      // ALERT here we can check which error we are receiving
      reject(e.message);
    }
  });
};
