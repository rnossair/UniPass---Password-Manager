import React, { useEffect } from 'react';
import "./App.scss";
import Home from "./pages/Home";
import { Route, Routes } from 'react-router-dom';
import PassGen from './pages/passgenerator.js';
import Register from './pages/Register';
import AuthPoint from "./pages/AuthPoint";
import Logoff from './pages/Logout';
import Login from './pages/Login';
import PassList from "./pages/passList";
import Profile from './pages/profile';
import NavBar from './Components/NavBar';
import { Navigate, useLocation } from 'react-router-dom';
export default function App() {
  let path = window.location.pathname;
  if (path === "/login") {
    path = "/register";
  }
  const location = useLocation();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    path = window.location.pathname;
  }, [location])

  return (
    <div id="App">
      <NavBar path={path} />
      <div id="content">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/gen" element={<PassGen />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth" element={<AuthPoint />} />
          <Route path="/logout" element={<Logoff />} />
          <Route path="/login" element={<Login />} />
          <Route path="/passlist" element={<PassList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>


    </div>
  );
}

