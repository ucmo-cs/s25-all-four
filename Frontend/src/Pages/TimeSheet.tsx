import React from 'react';
import NavBar from '../Shared/NavBar';
import TimesheetMenu from '../Components/TimeSheet/TimeSheetMenu'
import './Css/TimeSheet.css'

const TimeSheet: React.FC = () => {
  return (
    <main className='TimeSheet'>
         <NavBar/>
         <TimesheetMenu/>         
    </main>
  );
}

export default TimeSheet;