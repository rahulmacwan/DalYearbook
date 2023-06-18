import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import YearbookPage from './components/YearbookPage';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< YearbookPage />} />
        {/* Other routes go here */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
