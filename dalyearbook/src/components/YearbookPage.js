import React, { useState } from 'react';
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from '@material-ui/core';
import axios from 'axios';
import './YearbookPage.css';
import UniversityLogo from '../images/UniversityLogo.png';

const Yearbook = () => {
  const [program, setProgram] = useState('');
  const [year, setYear] = useState('');
  const [batch, setBatch] = useState('');
  const [yearbookEntries, setYearbookEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [yearbookData, setYearbookData] = useState([]);

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

  //Reference: https://jasonwatmore.com/post/2020/07/17/react-axios-http-post-request-examples
  const handleSubmit = async () => {
    try {
      const event = {
        program_year_batch: `${program}_${year}_${batch}`,
      };
  
      setIsLoading(true);
  
      const response = await axios.post(
        'https://yj35u62rd6ur4p4lodhzzeh46e0siiuy.lambda-url.us-east-2.on.aws/',
        JSON.stringify(event),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log(response.data);
      setYearbookData(response.data.Items);
      setIsLoading(false);
      alert('Yearbook created successfully!');
    } catch (error) {
      console.error(error);
      alert('Error creating yearbook. Please try again.');
      setIsLoading(false);
    }
  };


  return (
    
    <div className="yearbook-page">
       <div className="header">
          <img src={UniversityLogo} alt="University Logo" />
          
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

  
      <Button variant="contained" color="primary" className="submit-button" onClick={handleSubmit}>Submit</Button>
  
      {isLoading ? (
        <Typography variant="h6" component="p" className="loading-message">Loading...</Typography>
      ) : (
        <div className="yearbook-list">
          {yearbookData.map((entry) => (
            <Card key={entry.yearbook_id.S} className="yearbook-card">
              <CardHeader
                title={`${entry.first_name.S} ${entry.last_name.S}`}
                subheader={`${entry.program.S}, ${entry.graduation_batch.S} ${entry.graduation_year.N}`}
              />
              {entry.photo_url.S !== '' && (
                <div className="yearbook-photo-container">
                  <CardMedia
                    className="yearbook-photo"
                    image={`${entry.photo_url.S}`}
                    title={`${entry.first_name.S} ${entry.last_name.S}`}
                  />
                </div>
              )}
              <CardContent>
                <Typography variant="h6" component="p" className="entry-title">Yearbook Quote:</Typography>
                <Typography variant="body1" component="p" className="entry-text">{entry.yearbook_quote.S}</Typography>
                <Typography variant="h6" component="p" className="entry-title">Advice:</Typography>
                <Typography variant="body2" component="p" className="entry-text">{entry.advice.S}</Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

};

export default Yearbook;
