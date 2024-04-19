import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Navbar from "./pages/Navbar";
import SignIn from "./pages/Sign-in";
import SignUp from "./pages/Sign-up";
import Home from "./pages/Home";
import Match from "./pages/Match";
import Profile from "./pages/Profile";
import Perdata from "./pages/Perdata";
import Pertest from "./pages/Pertest";
import Resource from "./pages/Resource";

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleNavbar = () => {
    setShowSidebar(showSidebar => !showSidebar);
  }

  return (
    <BrowserRouter>
      <Navbar toggleNavbar={toggleNavbar}/>
      <Routes>
        <Route path="/" element={<Home showSidebar={showSidebar}/>} />
        <Route path="/match" element={<Match showSidebar={showSidebar}/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/perdata" element={<Perdata showSidebar={showSidebar}/>} />
        <Route path="/pertest" element={<Pertest showSidebar={showSidebar}/>} />
        <Route path="/resource" element={<Resource showSidebar={showSidebar}/>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;