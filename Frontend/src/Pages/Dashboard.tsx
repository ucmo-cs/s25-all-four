import React from 'react';
import './Css/Dashboard.css'
import NavBar from '../Shared/NavBar';
import MainDashboard from '../Components/Dashboard/MainDashboard';
import FindUsers from '../Components/Dashboard/FindUsers';

const Dashboard: React.FC = () => {
  

  return (
    <main className='Dashboard'>    
        <NavBar/>     
        <MainDashboard/>
        <FindUsers/>
    </main>
  );
}

export default Dashboard;