import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import CreateYearbook from './components/CreateYearbook';
import ManageYearbook from './components/ManageYearbook';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="create-yearbook" element={<CreateYearbook />} />
        <Route path="manage-yearbook" element={<ManageYearbook />} />
        {/* Other routes go here */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
