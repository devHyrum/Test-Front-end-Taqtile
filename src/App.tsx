import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import Welcome from './components/welcome/Welcome';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/welcome' element={<Welcome />} />
          <Route path='/' element={<Navigate to='/login' />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
