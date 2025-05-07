import React from "react";
import SignUp from "./assets/pages/SignUp";
import SignIn from "./assets/pages/SignIn";
import { Routes, Route } from "react-router-dom";
import SignUpConfirmation from "./assets/pages/SignUpConfirmation";
import Home from "./assets/pages/Home";


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="signup" element={<SignUp />} />
        <Route path="signup/confirmation" element={<SignUpConfirmation />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="home" element={<Home />}/>
      </Routes>
    </div>
  );
};

export default App;
