import React from 'react';
import NavBar from '../Shared/NavBar';
import './Css/AirTraffic.css'
import AirTrafficMenu from '../Components/AirTraffic/AirTrafficMenu';

const AirTraffic: React.FC = () => {
  return (
    <main className='AirTraffic'>
        <NavBar/>
        <AirTrafficMenu/>
    </main>
  );
}

export default AirTraffic;