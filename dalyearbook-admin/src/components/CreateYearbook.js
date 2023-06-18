  import React, { useState } from 'react';
  import { Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
  import UniversityLogo from '../images/UniversityLogo.png';
  import './CreateYearbook.css';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  import { v4 as uuidv4 } from 'uuid';



  const CreateYearbook = () => {
    const [program, setProgram] = useState('');
    const [year, setYear] = useState('');
    const [batch, setBatch] = useState('');
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

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

    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };

    //Reference: https://jasonwatmore.com/post/2020/07/17/react-axios-http-post-request-examples
    const handleSubmit = async () => {
      try {
        const fileContents = await file.text(); // convert file object to text
        const studentEmails = fileContents.split('\n'); // split by new line
        const filteredEmails = studentEmails.filter(Boolean); // remove empty strings
        const yearbookId = uuidv4(); // generate a unique ID using the uuid package
    
        const event = {
          yearbook_id: yearbookId,
          program_year_batch: `${program}_${year}_${batch}`,
          graduation_batch: batch,
          graduation_year: year,
          program: program,
          student_email: filteredEmails,
        };
    
        const response = await axios.post(
          'https://sfeoqwcnysyhrqtweqval3jaey0bnxis.lambda-url.us-east-2.on.aws/',
          JSON.stringify(event),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
    
        console.log(response.data);
        alert('Yearbook created successfully!');
      } catch (error) {
        console.error(error);
        alert('Error creating yearbook. Please try again.');
      }
    };

    

    const handleLogout = () => {
      navigate('/');
    };

    

    return (
      <div className="dashboard">
      <div className="header">
        <img src={UniversityLogo} alt="University Logo" />
        <Typography variant="h5" component="h1">Admin Dashboard</Typography>
        <button onClick={handleLogout} className="logout-button">Logout</button>
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

        <div className="file-upload">
          <input type="file" accept=".csv" onChange={handleFileChange} />
        </div>

        <div className="submit-button">
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    );
  };

  export default CreateYearbook;
