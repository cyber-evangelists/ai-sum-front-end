import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
 import PrivateRoute from './components/PrivateRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/login.component';
import SignUp from './components/signup.component';
import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <div className="App">    
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/home" element={<PrivateRoute Component={<Home/>} />} />  
              
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
