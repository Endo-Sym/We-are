import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import SignIn from "./pages/Sign-in";
import SignUp from "./pages/Sign-up";
import Home from "./pages/Home";
import Match from "./pages/Match";
import Message from "./pages/Message";
import Profile from "./pages/Profile";
import Perdata from "./pages/Perdata";
import Pertest from "./pages/Pertest";
import Resource from "./pages/Resource";


const App = () => (
  <BrowserRouter>
  <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/match" element={<Match />} />
      <Route path="/message" element={<Message />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/perdata" element={<Perdata />} />
      <Route path="/pertest" element={<Pertest />} />
      <Route path="/resource" element={<Resource />} />

      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      
    </Routes>
  </BrowserRouter>
);

export default App;