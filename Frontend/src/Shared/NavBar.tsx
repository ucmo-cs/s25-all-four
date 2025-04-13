import React from 'react';
import './css/NavBar.css'
import fox from '../Components/WebMenu/imgs/fox.png'
import Img from  './imgs/userLogo.svg'
import Dashboard from './imgs/dashboardimg.svg'
import calendar from './imgs/calendarimg.svg'
import chat from './imgs/chatimg.svg'
import cloud from './imgs/cloudimg.svg'
import exit from './imgs/exitimg.svg'
import { useNavigate } from 'react-router-dom';
import GetUserHook from './GetUserHook';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const {userInfo} = GetUserHook(false);
  // const [navigation, setNavigation] = useState<string>('');

  async function LogOut(): Promise<void> {
    try{
      await  fetch(`https://localhost:7010/api/UserInformation/${userInfo?.id}`,{
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...userInfo,
          loggedIn: false
        })
      });
    } catch(e){
      alert('We couldnt let you go please try again')
    } finally{
      // localStorage.setItem('UserAC', 'null');
      // localStorage.setItem('UserId', 'null');
      navigate('/')
    }    
  }

  // function HandleChangePage():void{

  // }

  return (
    <nav className='NavBar'>
         <ul>
            <li style={{marginBottom: 'auto'}}><img src={fox} alt="fox logo" style={{height: '100%', width: '100%'}}/></li>
            <div className='listNavbar'>
              <li onClick={() => navigate('/application/profile')}><img src={Img} alt="user img" /><p>Profile</p></li>
              <li onClick={() => navigate('/application/')}><img src={Dashboard} alt="fox img" /><p>Home</p></li>
              <li onClick={() => navigate('/application/timesheet')}><img src={calendar} alt="calendar img" /><p>Timesheet</p></li>
              {/* <li><img src={chat} alt="chat img" /><p>Chats</p></li> */}
              <li onClick={() => navigate('/application/airtraffic')}><img src={cloud} alt="cloud img" /><p>Wheater</p></li>
            </div>
            <li onClick={LogOut} style={{marginTop: 'auto', marginBottom: '1vh'}}><img src={exit} alt="exit img" /><p>exit</p></li>            
         </ul>
    </nav>
  );
}

export default NavBar;