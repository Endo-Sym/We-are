import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "./pages/Sign-in";
import SignUp from "./pages/Sign-up";
import Home from "./pages/Home";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </BrowserRouter>
);

export default App;