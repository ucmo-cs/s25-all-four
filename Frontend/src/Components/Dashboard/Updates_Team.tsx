import React, { useState } from 'react';
import './css/Updates_Team.css'
import GetAllUsersHook from '../../Shared/GetAllUsersHook';
import GetTeamHook from '../../Shared/GetTeamHook';
import GetUserHook from '../../Shared/GetUserHook';
import CreateNewUpdate from './CreateNewUpdate';

const Updates_Team: React.FC = () => {

    const {usersInfo, load} = GetAllUsersHook()
    const {userInfo, loading} = GetUserHook()
    const {teamInfo} = GetTeamHook()
    const [close, setClose] = useState<boolean>(true)
  return (
    <>
        <section className='Updates_Team'>
            <div className='RecentUpdatesContainer'>
                <div className='RecentUpdatesHeader'><h4>Recent updates</h4></div>
                <article className='RecentUpdates'>
                    <ul>
                        <li className='UpdatesItemContainer'>                    
                            <div className='ItemsUpdates'>
                                <h2>Item header name</h2>
                                <p>date</p>
                                <p>Some description of this</p>
                            </div>
                            <button>Hide this one</button>
                        </li>
                        <li className='UpdatesItemContainer'>                    
                            <div className='ItemsUpdates'>
                                <h2>Item header name</h2>
                                <p>date</p>
                                <p>Some description of this</p>
                            </div>
                            <button>Hide this one</button>
                        </li>
                        <li className='UpdatesItemContainer'>                    
                            <div className='ItemsUpdates'>
                                <h2>Item header name</h2>
                                <p>date</p>
                                <p>Some description of this</p>
                            </div>
                            <button>Hide this one</button>
                        </li>
                        <li className='UpdatesItemContainer'>                    
                            <div className='ItemsUpdates'>
                                <h2>Item header name</h2>
                                <p>date</p>
                                <p>Some description of this</p>
                            </div>
                            <button>Hide this one</button>
                        </li>
                    </ul>
                </article>
            </div>
            <div className='ButtonsUpdate'>
                <button className='' style={{backgroundColor: '#910012'}}>Hide All</button>
                <button className='' style={{backgroundColor: 'black'}} onClick={() => setClose(!close)}>{close === false ? 'Create new update' : 'Close pop up'}</button>
            </div>
            <div className='DisplayTeamInformation'>
                <div className='TeamMembers'>
                    <div className='TeamMembersHeader'><h4>Your team members</h4></div>
                    <div className='TeamMemebersContainer'>
                    {
                    
                    load === true ? <p>Loading users from your team...</p> :
                    (userInfo?.team === '') || (userInfo?.team === null) ? <p>You are not part of a team</p> :
                    usersInfo?.filter(u => u.team === teamInfo?.id)
                        .map((teamMember, index) => (
                        <div className='Member' key={index}>
                            <div className='MemeberContainer'>
                            <p>{teamMember.username}</p>
                            <img src="https://www.svgrepo.com/show/532362/user.svg" alt="user icon" />
                            </div>
                        </div>
                        ))
                    }
                    </div>
                </div>
                <div className='TeamMembers'>
                    <div className='TeamMembersHeader'><h4>Your team</h4></div>
                    <div className='TeamMemebersContainer teamImg'>
                        <img src="https://www.svgrepo.com/show/378088/firefox.svg" 
                            alt="team Example" />        
                    <h4>
                    {
                        
                        loading === true ? <p>loading...</p> : (userInfo?.team === '') || (userInfo?.team === null) ? 'You are not part of a team' : teamInfo?.teamName
                    }
                    </h4>
                    </div>
                </div>
                
            </div>
        </section>
        <CreateNewUpdate close={close} setClose={setClose}/>
    </>
  );
}

export default Updates_Team;