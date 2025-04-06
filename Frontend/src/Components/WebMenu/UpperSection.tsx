import React from 'react';
import './css/UpperSection.css';


const UpperSection: React.FC = () => {

  // function SetBackground(): void{
    
  // }

  return (
    <section className='UpperSection' id='UpperSection'>   
    <div className='TitleDivWM'>
      <h1>Pablo's Project SE 4920</h1>
    </div> 
    <span id='SecondSection'></span>
    <div className='GradientBackgroundWM'>
    </div>
    <div className='SelectionDivWM'>
      <ul >
        <li>About us</li>
        <li>FAQ</li>
        <li>Meet our team</li>
      </ul>
    </div>
    </section>
  );
}

export default UpperSection;