import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../../Pages/Dashboard';
import Profile from '../../Pages/Profile';
import TimeSheet from '../../Pages/TimeSheet';

const RouterApplication: React.FC = () => {
  return (
    <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/timesheet' element={<TimeSheet/>}/>
    </Routes>
  );
}

export default RouterApplication;