import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../../Pages/Dashboard';
import Profile from '../../Pages/Profile';

const RouterApplication: React.FC = () => {
  return (
    <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/profile' element={<Profile/>}/>
    </Routes>
  );
}

export default RouterApplication;