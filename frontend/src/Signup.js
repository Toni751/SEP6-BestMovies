import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { AuthContext } from "./AuthProvider";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const auth = useContext(AuthContext);

  const validateForm = () => {
    return username.length > 0 && password.length > 0 && email.length > 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    auth.signUp(username, email, password, (isSuccess) => {
      if (isSuccess) {
        console.log("User successfully sign up");
        setIsSignedUp(true);
      } else {
        setIsSignedUp(false);
        console.log("User cannot be created");
      }
    });
  };

  const handleConfirmationSubmit = (event) => {
    event.preventDefault();

    auth.handleConfirmation(
      username,
      password,
      confirmationCode,
      (isSuccess) => {
        if (isSuccess) {
          console.log("Confirmation successful");
        } else {
          console.log("Confirmation unsuccessful");
        }
      }
    );
  };

  return (
    <div>
      {isSignedUp ? (
        <Form onSubmit={handleConfirmationSubmit}>
          <Form.Group controlId="confirmationCode">
            <Form.Label>Confirmation code</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" disabled={confirmationCode === ""}>
            Confirm
          </Button>
        </Form>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            Create account
          </Button>
        </Form>
      )}
    </div>
  );
};

export default Signup;
