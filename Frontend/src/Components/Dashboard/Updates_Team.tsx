import React from 'react';
import './css/Updates_Team.css'

const Updates_Team: React.FC = () => {
  return (
    <section className='Updates_Team'>
        <div className='RecentUpdatesContainer'>
            <div className='RecentUpdatesHeader'><h4>Recent updates</h4></div>
            <article className='RecentUpdates'>            
            </article>
        </div>
        <div className='ButtonsUpdate'>
            <button className='' style={{backgroundColor: '#910012'}}>Hide All</button>
            <button className='' style={{backgroundColor: 'black'}}>Post new update</button>
        </div>
        <div className='DisplayTeamInformation'>
            <div className='TeamMembers'>
                <div className='TeamMembersHeader'><h4>Your team member</h4></div>
                <div className='TeamMemebersContainer'>
                    <div className='Member'>
                        <div className='MemeberContainer'>
                            <p>Username</p> 
                            <img src="https://www.svgrepo.com/show/532362/user.svg" alt="user icon" />
                        </div>                        
                    </div>
                    <div className='Member'>
                        <div className='MemeberContainer'>
                            <p>Username</p> 
                            <img src="https://www.svgrepo.com/show/532362/user.svg" alt="user icon" />
                        </div>                        
                    </div>
                    <div className='Member'>
                        <div className='MemeberContainer'>
                            <p>Username</p> 
                            <img src="https://www.svgrepo.com/show/532362/user.svg" alt="user icon" />
                        </div>                        
                    </div>
                </div>
            </div>
            <div className='TeamMembers'>
                <div className='TeamMembersHeader'><h4>Your team</h4></div>
                <div className='TeamMemebersContainer teamImg'>
                    <img src="https://www.svgrepo.com/show/378088/firefox.svg" 
                         alt="team Example" />        
                    <h4>Team name</h4>
                </div>
            </div>
            
        </div>
    </section>
  );
}

export default Updates_Team;