import React from 'react';
import './css/Team.css';
// import MeetTeam from './MeetTe1am';

const MeetTeam: React.FC = () => {
  return (
    <section className='MeetTeam'>
      <div className='MeetTeamContainer'>
      <h1>Meet our team members</h1>
      <div className='TeamMember'>
          <article className='MemberContainer'>
              <div className='MemeberBar'>
                  <div className='leftItems'>
                      <img src="https://www.svgrepo.com/show/474038/close-circle.svg" 
                            alt="close img" />
                      <img src="https://www.svgrepo.com/show/501269/minimize.svg" 
                            alt="minimize img" />
                  </div>                        
                  <img src="https://www.svgrepo.com/show/479131/information-3.svg" 
                        alt="information" 
                        style={{marginLeft: 'auto', marginRight: '1vw'}}/>
              </div>
              <img src="https://itspablopanchig.me/assets/img3-CS-qKeCt.jpg" 
                    alt="my img" 
                    id='MPIMG'
              />
              <h4>Pablo S. Panchig</h4>
              <h4>20 years old</h4>
          </article>
      </div>
      </div>   
      <div className='MemberSkillsContainer'>
      <h1>Responsabilities</h1>
      <div className='ResponsabilitiesContainer'>
        <div className='Responsability' style={{backgroundColor: '#F59A23'}}>Frontend</div>
        <div className='Responsability' style={{backgroundColor: '#63A103', top: '10%', right: '50%'}}>Backend</div>
        <div className='Responsability' style={{backgroundColor: '#00AAAA', bottom: '10%', right: '50%' }}>Designer</div>
      </div>
      </div>   
    </section>
  );
}

export default MeetTeam;