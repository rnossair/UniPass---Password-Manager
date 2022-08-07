import React from 'react';
import Home from "./pages/Home";
import { Route, Routes} from 'react-router-dom';
import PassGen from './pages/passgenerator.js';
import Register from './pages/Register';
import AuthPoint from "./pages/AuthPoint";
import Logoff from './pages/Logout';
import Login from './pages/Login';
export default function App() {
    return (
      <Routes>
        <Route exact path="/" element={<Home  />}/>
        <Route path="/gen" element={<PassGen/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/auth" element={<AuthPoint/>}/>
        <Route path="/logout" element={<Logoff/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>

        
    );
}

