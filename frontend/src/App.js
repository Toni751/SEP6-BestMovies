import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";
import Login from "./Login";
import Signup from "./Signup";
import Homepage from "./Homepage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route index element={<Homepage />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<Signup />}></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
