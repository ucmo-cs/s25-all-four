import React from 'react';
import './css/AirTrafficMenu.css'
import UpperSectionAir from './UpperSectionAir';
import LowerSectionAir from './LowerSectionAir';

const AirTrafficMenu: React.FC = () => {
  return (
    <section className='AirTrafficMenu'>
         <UpperSectionAir/>
         <LowerSectionAir/>
    </section>
  );
}

export default AirTrafficMenu;