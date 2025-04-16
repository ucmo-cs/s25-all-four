import React, { useEffect } from 'react';
import Updates_Team from './Updates_Team';
import Tasks_Team from './Tasks_Team';
import './css/MainDashboard.css'
import GetUserHook from '../../Shared/GetUserHook'
import { Element, scroller } from 'react-scroll';

const MainDashboard: React.FC = () => {
     
  const {userInfo, loading} = GetUserHook(false);
  useEffect(() => {
    scroller.scrollTo('scrollDashboard', {
      duration: 0,
      delay: 0,
      smooth: false      
    });
  }, []);

  return (
    <>
    <Element name="scrollDashboard"></Element>
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
    </>
  );
}

export default MainDashboard;