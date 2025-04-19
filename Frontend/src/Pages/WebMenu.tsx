import React from 'react';
import './Css/WebMenu.css';
import NavbarWM from '../Components/WebMenu/NavbarWM';
import UpperSection from '../Components/WebMenu/UpperSection';
import OurMission from '../Components/WebMenu/OurMission';
import WhatWeOffer from '../Components/WebMenu/WhatWeOffer';
import MeetTeam from '../Components/WebMenu/MeetTeam';
import Footer from '../Components/WebMenu/Footer';

const WebMenu: React.FC = () => {
  return (
    <main className='WebMenu'>
        <NavbarWM />
        <UpperSection />
        <OurMission />
        <WhatWeOffer />
        <MeetTeam />
        <Footer />
    </main>
  );
}

export default WebMenu;