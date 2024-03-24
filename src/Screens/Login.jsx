import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './style.css';
import axios from 'axios';


function Login() {
  const [email, setEmail] = useState('');
  const [password,setPassword]=useState('');

  const loginUser = (e) => {
    e.preventDefault(); 
    if (email.length === 0) {
      alert('Email cannot be empty');
    } else if (password.length === 0) {
      alert('Password is empty');
    } else {
      axios.post('http://127.0.0.1:5000/login', {
          email: email,
          password: password
        })
        .then(function(response) {
          console.log(response);
          if (response.status === 200) {
            // Redirect to home page upon successful login
            window.location.href = '/';
          } else {
            // Handle unexpected response status
            alert('Unexpected response from server');
          }
        })
        .catch(function(error) {
          console.log(error);
          if (error.response && error.response.status === 401) {
            // Invalid credentials
            alert('Invalid credentials');
          } else {
            // Other errors
            alert('An error occurred while processing your request');
          }
        });
    }
  };
  
 return (
  <div className='home'>
    <div className="form-container">
      <h1 className='heading'>Login</h1>
      <Form>
        <div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={loginUser} >
            Login
          </Button>
        </div>
      </Form>
      
      <p>If new, <Link to="/register">register here</Link></p>
    </div>
  </div>
);

}

export default Login;
