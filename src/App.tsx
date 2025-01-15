import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import Welcome from './components/welcome/Welcome';
import Home from './components/home/Home';
import AddUser from 'components/add user/AddUser';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/add-user' element={<AddUser />} />
          <Route path='/login' element={<Login />} />
          <Route path='/welcome' element={<Welcome />} />
          <Route path='/' element={<Home />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
