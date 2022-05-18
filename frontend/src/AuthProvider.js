import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";

let AuthContext = React.createContext({});

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (userid, password, callback) => {
    try {
      const user = await Auth.signIn(userid, password);
      console.log("Auth response", user);
      setIsAuthenticated(true);
      console.log("Logged in successfully");
      callback(true);
    } catch (e) {
      console.log(e);
      callback(false);
    }
  };

  const signOut = (callback) => {
    console.log("Signing out user");
    setIsAuthenticated(false);
  };

  const signUp = async (username, email, password, callback) => {
    try {
      const newUser = await Auth.signUp({
        username: username,
        password: password,
        attributes: { email: email },
      });
      console.log("Sign up", newUser);
      setIsAuthenticated(true);
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
    isAuthenticated,
    login,
    signOut,
    signUp,
    handleConfirmation,
  };
  console.log("Initialized auth value", value);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
