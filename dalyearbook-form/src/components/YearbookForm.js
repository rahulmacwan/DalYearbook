import React, { useState } from 'react';
import { Typography, TextField, Button, Select, MenuItem, InputLabel } from '@material-ui/core';
import './YearbookForm.css';
import UniversityLogo from '../images/UniversityLogo.png';
import axios from 'axios';

const YearbookForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [program, setProgram] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [graduationBatch, setGraduationBatch] = useState('');
  const [photo, setPhoto] = useState(null);
  const [yearbookQuote, setYearbookQuote] = useState('');
  const [advice, setAdvice] = useState('');

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Reference: https://jasonwatmore.com/post/2020/07/17/react-axios-http-post-request-examples
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
  
    let photoData = null;
    if (photo) {
      // Convert the image to a base64-encoded string
      const base64Image = photo.split(',')[1];
      photoData = {
        contentType: 'image/jpeg',
        data: base64Image,
      };
    }
  
    const data = {
      student_email: email,
      firstName,
      lastName,
      programYearBatch: `${program}_${graduationYear}_${graduationBatch}`,
      yearbookQuote,
      advice,
      photo: photoData,
    };
  
    try {
      const response = await axios.post('https://pjoa3y6br3mdpyqt2gqu2rnl3m0zuueq.lambda-url.us-east-2.on.aws/', data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };  
  

  const programs = [
    'Bachelor of Applied Computer Science',
    'Bachelor of Computer Science',
    'MSc. Computational Biology and Bioinformatics',
    'Master of Applied Computer Science',
    'Master of Computer Science',
    'Master of Digital Innovation',
    'PhD in Computer Science',
  ];

  const years = [];
  for (let i = 2023; i <= 2050; i++) {
    years.push(i);
  }

  const batches = ['Winter', 'Summer', 'Fall'];
  return (
    <div className="dashboard">
      <div className="header">
        <img src={UniversityLogo} alt="University Logo" />
        
      </div>
  
      <form onSubmit={handleSubmit} className="yearbook-form">
        <Typography variant="h5" component="h2">Yearbook Form</Typography>

        <div className="form-field">
          <InputLabel id="program-select-label">Program</InputLabel>
          <Select
            labelId="program-select-label"
            id="program-select"
            value={program}
            onChange={(event) => setProgram(event.target.value)}
            required
          >
            {programs.map((program) => (
              <MenuItem key={program} value={program}>{program}</MenuItem>
            ))}
          </Select>
        </div>
        <div className="form-field">
  <InputLabel id="graduation-year-select-label">Graduation Year</InputLabel>
  <Select
    labelId="graduation-year-select-label"
    id="graduation-year-select"
    value={graduationYear}
    onChange={(event) => setGraduationYear(event.target.value)}
    required
  >
    {years.map((year) => (
      <MenuItem key={year} value={year}>{year}</MenuItem>
    ))}
  </Select>
</div>
<div className="form-field">
  <InputLabel id="graduation-batch-select-label">Graduation Batch</InputLabel>
  <Select
    labelId="graduation-batch-select-label"
    id="graduation-batch-select"
    value={graduationBatch}
    onChange={(event) => setGraduationBatch(event.target.value)}
    required
  >
    {batches.map((batch) => (
      <MenuItem key={batch} value={batch}>{batch}</MenuItem>
    ))}
  </Select>
</div>

        <div className="form-field">
          <TextField
            label="First Name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <TextField
            label="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="form-field">
          {photo ? (
            <div className="square-image-wrapper">
              <img src={photo} alt="Selected photo" className="square-image" />
            </div>
          ) : (
            <>
              <span>Choose Photo:</span>
              <input type="file" accept="image/*" onChange={handlePhotoChange} />
            </>
          )}
        </div>
        <div className="form-field">
          <TextField
            label="Yearbook Quote"
            value={yearbookQuote}
            onChange={(event) => setYearbookQuote(event.target.value)}
            multiline
            required
          />
        </div>
        <div className="form-field">
          <TextField
            label="Yearbook Advice"
            value={advice}
            onChange={(event) => setAdvice(event.target.value)}
            multiline
            required
          />
        </div>
      
        <div className="form-field">
          <Button type="submit" variant="contained" color="primary" className="submit-button">Submit</Button>
        </div>
      </form>
    </div>
  );
    };

export default YearbookForm;
