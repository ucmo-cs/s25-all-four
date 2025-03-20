import React from 'react';
import Updates_Team from './Updates_Team';
import Tasks_Team from './Tasks_Team';
import './css/MainDashboard.css'
import GetUserHook from '../../Shared/GetUserHook'

const MainDashboard: React.FC = () => {
     
  const {userInfo, loading} = GetUserHook(false);
  

  return (
    <section className='MainDashboard'>
        <div className='DashboardContainer'>
          <div className='HeaderName'>
            {
              loading === true ? "Loading" : userInfo?.username.toUpperCase().substring(0,25)
            }

          </div>
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