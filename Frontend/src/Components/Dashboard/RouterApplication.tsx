import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../../Pages/Dashboard';
import Profile from '../../Pages/Profile';
import TimeSheet from '../../Pages/TimeSheet';
import NotFoundApp from '../../Pages/NotFoundApp';
import GetAllUsersHook from '../../Shared/GetAllUsersHook';
import UserInformation from '../../Pages/UserInformation';

const RouterApplication: React.FC = () => {
  const {usersInfo} = GetAllUsersHook();
  return (
    <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/timesheet' element={<TimeSheet/>}/>
        {
          usersInfo?.map((user) => (
            <Route key={user.id} path={`/user/${user.username}`} element={<UserInformation userInformation={user}/>}/>
          ))
        }
        <Route path='/*' element={<NotFoundApp/>}/>
    </Routes>
  );
}

export default RouterApplication;