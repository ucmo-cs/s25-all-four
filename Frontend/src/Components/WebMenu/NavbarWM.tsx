import React from 'react';
import './css/NavbarWM.css';
import logo from './imgs/fox.png'
import { useNavigate } from 'react-router-dom';
import { scroller } from 'react-scroll';

const NavbarWM: React.FC = () => {

  const navigate = useNavigate();
  const scrollToInPage = (where: string): void =>{
    scroller.scrollTo(where,{
      smooth: false
    })
  }

  return (
    <nav className='NavbarWM'>
        <div className='NavbarUpperDiv'>                      
            <img src={logo} alt="fox-logo" id='FoxLogo'/>                          
            <div className='searchNavbar'>
                <input type="text" placeholder='hola'/>  
                <img src="https://www.svgrepo.com/show/507417/search-circle.svg" alt="search-icon" />       
            </div>          
        </div>
        <div id='NavbarLowerDiv'>
            <ul>            
              <li onClick={() => scrollToInPage('AboutUsSection')}>About us</li>
              <li onClick={() => scrollToInPage('LeadersScroll')}>Leaders</li>
              <li onClick={() => navigate('/login')}>Create Account</li>
              <li onClick={() => navigate('/login')}>Login</li>
            </ul>
        </div>
    </nav>
  );
}

export default NavbarWM;