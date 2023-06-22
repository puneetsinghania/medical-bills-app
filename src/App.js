import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BillFormPage from "./pages/BillFormPage";
import SummaryPage from "./pages/SummaryPage";
import NavBar from "./components/NavBar";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import './App.css';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' exact element={<HomePage />} />
        <Route path="/add-bill/:billIndex?" element={<BillFormPage />} />
        <Route path="/edit/:billIndex" element={<BillFormPage />} />
        <Route path="/summary/:billId" element={<SummaryPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
};

export default App;
