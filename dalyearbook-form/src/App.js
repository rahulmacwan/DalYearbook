import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import YearbookForm from './components/YearbookForm';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< YearbookForm />} />
        {/* Other routes go here */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
