import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";

let AuthContext = React.createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (userid, password, callback) => {
    try {
      const user = await Auth.signIn(userid, password);
      console.log("Auth response", user);
      const userData = user.signInUserSession.idToken.payload;
      console.log("ID Token", userData);
      const newUser = {
        username: userData["cognito:username"],
        email: userData.email,
        iat: userData.iat,
        exp: userData.exp,
      };
      console.log("New user", newUser);
      setUser(newUser);
      console.log("Logged in successfully");
      callback(true);
    } catch (e) {
      console.log(e);
      callback(false);
    }
  };

  const signOut = (callback) => {
    console.log("Signing out user");
    setUser(null);
    callback();
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

  const handleConfirmation = async (
    username,
    password,
    confirmationCode,
    callback
  ) => {
    try {
      // console.log("Starting sign up confirmation");
      await Auth.confirmSignUp(username, confirmationCode);
      // console.log("Started sign in after sign up confirmation");
      await Auth.signIn(username, password);
      callback(true);
    } catch (e) {
      console.log(e);
      callback(false);
    }
  };

  const value = {
    user,
    login,
    signOut,
    signUp,
    handleConfirmation,
  };
  console.log("Initialized auth value", value);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
