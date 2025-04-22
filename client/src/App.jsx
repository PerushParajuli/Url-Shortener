import React from "react";
import SignUp from "./assets/pages/SignUp";
import SignIn from "./assets/pages/SignIn";
import { Routes, Route } from "react-router-dom";
import SignUpConfirmation from "./assets/pages/SignUpConfirmation";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="signup" element={<SignUp />} />
        <Route path="signup/confirmation" element={<SignUpConfirmation />} />
        <Route path="signin" element={<SignIn />} />
      </Routes>
    </div>
  );
};

export default App;
