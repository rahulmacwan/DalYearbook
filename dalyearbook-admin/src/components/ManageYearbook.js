import React, { useState } from 'react';
import { Typography, FormControl, InputLabel, Select, MenuItem, Grid, TextField, Button } from '@material-ui/core';
import UniversityLogo from '../images/UniversityLogo.png';
import './ManageYearbook.css';

const ManageYearbook = () => {
  const [program, setProgram] = useState('');
  const [year, setYear] = useState('');
  const [batch, setBatch] = useState('');
  const [yearbookEntries, setYearbookEntries] = useState([]);

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

  const handleProgramChange = (event) => {
    setProgram(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleBatchChange = (event) => {
    setBatch(event.target.value);
  };

  const handleYearbookEntriesChange = (updatedEntry) => {
    setYearbookEntries(prevState => {
      const updatedEntries = [...prevState];
      const entryIndex = updatedEntries.findIndex(entry => entry.id === updatedEntry.id);
      updatedEntries[entryIndex] = updatedEntry;
      return updatedEntries;
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // fetch yearbook entries from backend API based on selected program, year, and batch
    // setYearbookEntries(responseData);
  };

  return (
    <div className="dashboard">
      <div className="header">
        <img src={UniversityLogo} alt="University Logo" />
        <Typography variant="h5" component="h1">Admin Dashboard</Typography>
      </div>

      <div className="dropdowns-container">
        <FormControl className="form-control">
          <InputLabel id="program-label">Program</InputLabel>
          <Select
            labelId="program-label"
            id="program"
            value={program}
            onChange={handleProgramChange}
          >
            {programs.map((program) => (
              <MenuItem key={program} value={program}>{program}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="form-control">
          <InputLabel id="year-label">Year</InputLabel>
          <Select
            labelId="year-label"
            id="year"
            value={year}
            onChange={handleYearChange}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="form-control">
          <InputLabel id="batch-label">Batch</InputLabel>
          <Select
            labelId="batch-label"
            id="batch"
            value={batch}
            onChange={handleBatchChange}
          >
            {batches.map((batch) => (
              <MenuItem key={batch} value={batch}>{batch}</MenuItem>
            ))}
          </Select>
        </FormControl>
        
      </div>
      <div className="submit-button">
        <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
      </div>
    

        <div className="yearbook-entries">
  {yearbookEntries.length > 0 ? (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Photo</th>
          <th>Yearbook Quote</th>
          <th>Advice for Future Students</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {yearbookEntries.map((entry) => (
          <tr key={entry.id}>
            <td>{entry.firstName}</td>
            <td>{entry.lastName}</td>
            <td><img src={entry.photo} alt={`${entry.firstName} ${entry.lastName}`} /></td>
            <td>{entry.yearbookQuote}</td>
            <td>{entry.advice}</td>
            <td><button>Edit</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>No yearbook entries found</p>
  )}
</div>
        </div>
    

    );
};

export default ManageYearbook;
