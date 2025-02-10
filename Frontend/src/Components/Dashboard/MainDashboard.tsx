import React from 'react';
import Updates_Team from './Updates_Team';
import Tasks_Team from './Tasks_Team';
import './css/MainDashboard.css'

const MainDashboard: React.FC = () => {
  return (
    <section className='MainDashboard'>
        <div className='DashboardContainer'>
          <div className='HeaderName'>Username</div>
          <div className='SectionsDashboard'> 
            <div className='NewsInformation'>
                <Updates_Team/>
            </div>
            <div className='TasksInformation'>
                <Tasks_Team/>
            </div>
          </div>
        </div>
    </section>
  );
}

export default MainDashboard;