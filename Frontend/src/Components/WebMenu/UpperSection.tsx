import React, { useEffect } from 'react';
import './css/UpperSection.css';
import { scroller, Element } from 'react-scroll';

const UpperSection: React.FC = () => {

  // function SetBackground(): void{
    
  // }

  useEffect(() =>{
    scroller.scrollTo('scrollMainWeb',{
      smooth: false
    })
  },[])
  return (
    <>
      <Element name='scrollMainWeb'></Element>
      <section className='UpperSection' id='UpperSection'>   
      <div className='TitleDivWM'>
        <h1>Pablo's Project SE 4920</h1>
      </div> 
      <span id='SecondSection'></span>
      <Element name='AboutUsSection'></Element> 
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
    </>
  );
}

export default UpperSection;