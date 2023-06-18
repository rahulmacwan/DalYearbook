import React, { useState, useEffect, useRef } from 'react';
import UniversityLogo from '../images/UniversityLogo.png';
import './AdminDashboard.css';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';


const Dashboard = () => {
  
  return (
    <div className="dashboard">
      <div className="header">
        <img src={UniversityLogo} alt="University Logo" />
        <Typography variant="h5" component="h1">Admin Dashboard</Typography>
      </div>

        <div className="content-header">
          <Typography variant="h6" component="h2">Welcome, Admin</Typography>
        </div>
        <div className="admin-dashboard">
      
      <div className="dashboard-buttons">
        <Link to="/create-yearbook">
          <button className="create-yearbook-button">Create Yearbook</button>
        </Link>
        <Link to="/manage-yearbook">
          <button className="manage-yearbook-button">Manage Yearbook</button>
        </Link>
      </div>
    </div>
    </div>
  );


};


export default Dashboard;
