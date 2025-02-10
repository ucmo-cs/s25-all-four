import React from 'react';
import './Css/WebMenu.css';
import NavbarWM from '../Components/WebMenu/NavbarWM';
import UpperSection from '../Components/WebMenu/UpperSection';
import OurMission from '../Components/WebMenu/OurMission';
import WhatWeOffer from '../Components/WebMenu/WhatWeOffer';
import MeetTeam from '../Components/WebMenu/MeetTeam';

const WebMenu: React.FC = () => {
  return (
    <main className='WebMenu'>
        <NavbarWM />
        <UpperSection />
        <OurMission />
        <WhatWeOffer />
        <MeetTeam />
    </main>
  );
}

export default WebMenu;