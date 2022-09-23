import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//components
import Navbar from './components/Navbar';
import Form from './components/Form';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Users from './components/Users';
import ProjectDetails from './components/ProjectDetails';
import { useModeContext } from './hooks/useModeContext';

//contexts
import { useAuthContext } from './hooks/useAuthContext';

const App = () => {
  const { user } = useAuthContext();
  const { mode } = useModeContext();

  return (
    <div className={`App ${mode} p-2`}>
      <BrowserRouter>
      <Navbar />
      <div className='md:flex'>      
        {user && <Sidebar />}
        <div className={`App ${mode} bg-gray-100 md:p-4 pb-96 w-full`}>
          <Routes>
            <Route path='/' element={user ? <Dashboard /> : <Navigate to='/login' />} />
            <Route path='/form' element={user ? <Form /> : <Navigate to='/login' />} />
            <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
            <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
            <Route path='/project/:id' element={user ? <ProjectDetails /> : <Navigate to='/' />} />
          </Routes>
        </div>
        {user && <Users />}
      </div>
      </BrowserRouter>
    </div>

  );
}

export default App;
