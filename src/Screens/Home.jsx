import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'; // Import your CSS file

const Home = () => {
  return (
    <div className="container">
      <h1>Welcome to Your Home Page</h1>
      <div className="buttons">
        <Link to="/login" className="button">Login</Link>
        <Link to="/register" className="button">Register</Link>
      </div>
    </div>
  );
};

export default Home;
