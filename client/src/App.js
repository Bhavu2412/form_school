import Navbar from "./Components/Navbar";
import "rsuite/dist/rsuite.min.css";
import "./App.css";
import { Button } from "rsuite";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Dashboard from "./Pages/Dashboard";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Form from "./Pages/Form";
import Create from "./Pages/Create";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useEffect } from "react";
export default function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/form" element={<Form />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}
