import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/login', { email, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log(response.data);
      localStorage.setItem('accessToken', response.data.access_token);
      navigate("/home")
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <div>
      <Nav/>
    <form onSubmit={handleSubmit}>
    
      <h3>Sign In</h3>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          name="email"
          value={email}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
    </div>
  );
};

export default Login;
