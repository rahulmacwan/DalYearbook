import React, { useState } from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';
import UniversityLogo from '../images/UniversityLogo.png';



const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  //Reference: https://jasonwatmore.com/post/2020/07/17/react-axios-http-post-request-examples
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post(
        'https://gvkcyzjzdc73a5hrhbcj36m3s40xfykf.lambda-url.us-east-2.on.aws/',
        { email: username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      // Check if login was successful and redirect to dashboard
      if (response.status === 200) {
        navigate('/create-yearbook');
      } else {
        setError('Incorrect email or password');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred during login. Please try again.');
    }
  };
  return (

<div className="login-page">
  <div className="header">
    <img src={UniversityLogo} alt="University Logo" />
  </div>

  <div className="login-container">
    <Typography variant="h4" component="h1" align="center" gutterBottom>
      Login
    </Typography>
    {error && <div className="error">{error}</div>}
    <form onSubmit={handleSubmit}>
      <TextField
        label="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        type="password"
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
    </form>
  </div>
</div>


  );
};

export default LoginPage;
