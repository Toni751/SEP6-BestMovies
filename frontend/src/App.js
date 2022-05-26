import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Homepage from "./components/Homepage";
import Discover from "./components/Discover";
import SeeProfile from "./components/SeeProfile";
import Favourites from "./components/Favourites";
import Navbar from "./components/Navbar";
import "./styles/Commons.css";
import RequireAuth from "./auth/RequireAuth";
import Trending from "./components/Trending";
import MoviePage from "./components/MoviePage";
import ActorPage from "./components/ActorPage";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route index element={<Homepage />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<Signup />}></Route>
        <Route path="discover" element={<Discover />}></Route>
        <Route path="movie/:movieId" element={<MoviePage />}></Route>
        <Route path="person/:personId" element={<ActorPage />}></Route>
        <Route
          path="seeprofile"
          element={
            <RequireAuth>
              <SeeProfile />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="trending"
          element={
            <RequireAuth>
              <Trending />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="favourites"
          element={
            <RequireAuth>
              <Favourites />
            </RequireAuth>
          }
        ></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
