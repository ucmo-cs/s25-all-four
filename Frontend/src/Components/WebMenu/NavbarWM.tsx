import React from 'react';
import './css/NavbarWM.css';
import logo from './imgs/fox.png'
import { useNavigate } from 'react-router-dom';

const NavbarWM: React.FC = () => {

  const navigate = useNavigate();

  return (
    <nav className='NavbarWM'>
        <div className='NavbarUpperDiv'>
          <a href="#UpperSection">
            <img src={logo} alt="fox-logo" id='FoxLogo'/>    
          </a>
            <div className='searchNavbar'>
                <input type="text" placeholder='hola'/>  
                <img src="https://www.svgrepo.com/show/507417/search-circle.svg" alt="search-icon" />       
            </div>          
        </div>
        <div id='NavbarLowerDiv'>
            <ul>
              <li><a href="#SecondSection">About us</a></li>
              <li>Leaders</li>
              <li>Create Account</li>
              <li onClick={() => navigate('/login')}>Login</li>
            </ul>
        </div>
    </nav>
  );
}

export default NavbarWM;