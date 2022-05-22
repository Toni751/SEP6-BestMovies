import React, { useState } from "react";
import { Auth } from "aws-amplify";

let AuthContext = React.createContext({});

const getSessionStorageUser = () => {
  const user = sessionStorage.getItem("id-token");
  if (user) {
    return JSON.parse(user);
  }

  return null;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getSessionStorageUser());

  const login = async (userid, password) => {
    const response = await authenticatingUser(userid, password);
    return response;
  };

  const signOut = () => {
    console.log("Signing out user");
    sessionStorage.removeItem("id-token");
    setUser(null);
  };

  const signUp = async (username, email, password, callback) => {
    try {
      const newUser = await Auth.signUp({
        username: username,
        password: password,
        attributes: { email: email },
      });
      console.log("Sign up", newUser);
      callback(true);
    } catch (e) {
      console.log(e);
      callback(false);
    }
  };

  const handleConfirmation = async (userid, password, confirmationCode) => {
    try {
      await Auth.confirmSignUp(userid, confirmationCode);
      const response = await authenticatingUser(userid, password);
      return response;
    } catch (e) {
      console.log(e.message);
      return e.message;
    }
  };

  const resendConfirmation = async (userid) => {
    try {
      await Auth.resendSignUp(userid);
    } catch (e) {
      console.log(e.message);
    }
  };

  const authenticatingUser = async (userid, password) => {
    try {
      const user = await Auth.signIn(userid, password);
      console.log("Auth response", user);
      const userData = user.signInUserSession.idToken.payload;
      console.log("ID Token", userData);
      const newUser = {
        username: userData["cognito:username"],
        email: userData.email,
        verified: userData.email_verified,
        iat: userData.iat,
        exp: userData.exp,
      };
      console.log("New user", newUser);
      setUser(newUser);
      sessionStorage.setItem("id-token", JSON.stringify(newUser));
      console.log("Logged in successfully");
      return "true";
    } catch (e) {
      console.log(e.message);
      return e.message;
    }
  };

  const deleteAccount = async () => {
    try {
      await Auth.deleteUser();
      signOut();
    } catch (e) {
      console.log(e);
    }
  };

  const value = {
    user,
    login,
    signOut,
    signUp,
    handleConfirmation,
    deleteAccount,
    resendConfirmation,
  };
  console.log("Initialized auth value", value);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
