import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Homepage from "./components/Homepage";
import Discover from "./components/Discover";
import SeeProfile from "./components/SeeProfile";
import Navbar from "./components/Navbar";
import "./styles/Commons.css";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route index element={<Homepage />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<Signup />}></Route>
        <Route path="discover" element={<Discover />}></Route>
        <Route path="seeprofile" element={<SeeProfile />}></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
