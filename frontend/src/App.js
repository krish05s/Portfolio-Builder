import React, { useState } from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/home";
import Footer from "./components/Footer";
import BasicDetails from "./components/BasicDetails";
import MainDetails from "./components/MainDetails";
import Register from "./components/Register";
import Login from "./components/Login";
import Alert from './components/Alert';
import Portfolio from './components/portfolio';
import About from './components/About';


function App() {

const [alert, setAlert] = useState(null);


const showAlert = (message, type)=>{
   setAlert({
    msg: message,
    type: type
   })
   setTimeout(() =>{
      setAlert(null);
   }, 2500);
}


  return(
    <Router>
      <Navbar showAlert={showAlert} />
      <Alert alert={alert}/>
        <Routes>
          <Route path="/" element={<Home showAlert={showAlert}/>} />
          <Route path="/basicdetails" element={<BasicDetails showAlert={showAlert} />}/>
          <Route path="/maindetails" element={<MainDetails showAlert={showAlert} />}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/register" element={<Register showAlert={showAlert} />} />
          <Route path="/login" element={<Login  showAlert={showAlert}/>} />
          <Route path="/portfolio" element={<Portfolio  showAlert={showAlert}/>} />
        </Routes>
      <Footer showAlert={showAlert}/>
    </Router>
  );
}

export default App;