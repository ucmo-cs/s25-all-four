import React from 'react';
import './css/NavBar.css'
import fox from '../Components/WebMenu/imgs/fox.png'
import user from  './imgs/userLogo.svg'
import Dashboard from './imgs/dashboardimg.svg'
import calendar from './imgs/calendarimg.svg'
import chat from './imgs/chatimg.svg'
import cloud from './imgs/cloudimg.svg'
import exit from './imgs/exitimg.svg'
import { useNavigate } from 'react-router-dom';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <nav className='NavBar'>
         <ul>
            <li style={{marginBottom: 'auto'}}><img src={fox} alt="fox logo" style={{height: '100%', width: '100%'}}/></li>
            <div className='listNavbar'>
              <li onClick={() => navigate('/application/profile')}><img src={user} alt="user img" /><p>Profile</p></li>
              <li onClick={() => navigate('/application/')}><img src={Dashboard} alt="fox img" /><p>Home</p></li>
              <li><img src={calendar} alt="calendar img" /><p>Timesheet</p></li>
              <li><img src={chat} alt="chat img" /><p>Chats</p></li>
              <li ><img src={cloud} alt="cloud img" /><p>Wheater</p></li>
            </div>
            <li onClick={() => navigate('/')} style={{marginTop: 'auto', marginBottom: '1vh'}}><img src={exit} alt="cloud img" /><p>exit</p></li>            
         </ul>
    </nav>
  );
}

export default NavBar;