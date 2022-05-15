import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router";

const Login = () => {
  const [password, setPassword] = useState("");
  const [userid, setUserid] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const validateForm = () => {
    return userid.length > 0 && password.length > 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    auth.signIn(userid, password, (isSucess) => {
      if (isSucess) {
        setIsLoggedIn(true);
      } else {
        clearFields();
        console.log("Incorrect user credentials");
      }
    });
  };

  const signOut = () => {
    clearFields();
    console.log("Logged out");
  };

  const clearFields = () => {
    setUserid("");
    setPassword("");
    setIsLoggedIn(false);
  };

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="userid">
          <Form.Label>Username or email</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={userid}
            onChange={(e) => setUserid(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
      {isLoggedIn && <button onClick={() => signOut()}>Log out</button>}
    </div>
  );
};

export default Login;
