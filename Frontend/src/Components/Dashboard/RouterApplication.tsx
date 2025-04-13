import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../../Pages/Dashboard';
import Profile from '../../Pages/Profile';
import TimeSheet from '../../Pages/TimeSheet';
import NotFoundApp from '../../Pages/NotFoundApp';
import GetAllUsersHook from '../../Shared/GetAllUsersHook';
import UserInformation from '../../Pages/UserInformation';
import AirTraffic from '../../Pages/AirTraffic';
import { Project } from '../Profile/NewProject';
import ProjectnfoPage from '../../Pages/ProjectnfoPage';

const RouterApplication: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const GetProject = async(): Promise<void> =>{
      try{
        const response = await fetch("https://localhost:7010/api/Project");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const TasksData: Project[] = await response.json();
        console.log("Fetched projects:", TasksData);
        setProjects(TasksData);
      } catch(e) {
        console.error("Fetch error:", e);
        alert("Couldn't get the task information");
      }
    }
    GetProject();
  }, [])
  

  const {usersInfo} = GetAllUsersHook();
  return (
    <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/airtraffic' element={<AirTraffic/>}/>
        <Route path='/timesheet' element={<TimeSheet/>}/>
        {
          usersInfo?.map((user) => (
            <Route key={user.id} path={`/user/${user.username}`} element={<UserInformation userInformation={user}/>}/>
          ))
        }
        {
          projects?.map((project) => (
            <Route key={project.id} path={`/project/${project.id}`} element={<ProjectnfoPage ProjectInformation={project}/>}/>
          ))
        }
        <Route path='/*' element={<NotFoundApp/>}/>
    </Routes>
  );
}

export default RouterApplication;