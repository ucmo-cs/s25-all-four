import React, { useEffect, useState } from 'react';
import './css/Updates_Team.css'
import GetAllUsersHook from '../../Shared/GetAllUsersHook';
import GetTeamHook from '../../Shared/GetTeamHook';
import GetUserHook from '../../Shared/GetUserHook';
import CreateNewUpdate, { IUpdate } from './CreateNewUpdate';
import { useNavigate } from 'react-router-dom';

const Updates_Team: React.FC = () => {

    const navigate = useNavigate()
    const {usersInfo, load} = GetAllUsersHook()
    const {userInfo, loading} = GetUserHook(false)
    const {teamInfo} = GetTeamHook()
    const [close, setClose] = useState<boolean>(false)
    const [updates, setUpdates] = useState<IUpdate[]>()

    function HaveTeamCheck(): void{
        if(userInfo?.team !== null){            
            setClose(!close)
        }else{
            alert('Join a team in order to post an update')
            setClose(false)
        }
    }

    async function GetAllUpdates(): Promise<void> {
        const url: string = 'https://localhost:7010/api/Updates'    
        const response = await fetch(url)
        const updates: IUpdate[] = await response.json();
        setUpdates(updates)
    }

    async function DeleteUpdate(id: string): Promise<void> {
        const url: string = `https://localhost:7010/api/Updates/${id}`
        try{
          await fetch(url,{method: 'DELETE'})
        } catch(e){
          alert(e + ' No updated deleted')
        }finally{
          GetAllUpdates();
        }
    }    

    const HideAllUpdates = (): void => {
        var updates = document.querySelectorAll('.UpdatesItemContainer') as NodeListOf<HTMLElement>;
        updates.forEach((update) => {
            update.style.display = 'none';
        })
    }

    useEffect(() => {
        GetAllUpdates()
    },[])
  return (
    <>
        <section className='Updates_Team'>
            <div className='RecentUpdatesContainer'>
                <div className='RecentUpdatesHeader'><h4>Recent updates</h4></div>
                <article className='RecentUpdates'>
                    <ul>
                        {
                            updates?.filter((u) => u.teamId === userInfo?.team).map((update, index) =>(
                            <li className='UpdatesItemContainer' key={index}>                    
                                <div className='ItemsUpdates'>
                                    <h2>{update.title}</h2>
                                    <p>Posted on: <b style={{marginLeft: '0.5em'}}>{update.dateCreated.substring(0,10)} </b>@<b>{update.dateCreated.substring(11,16)}</b></p>
                                    <p>Posted by: <b style={{marginLeft: '0.5em'}}>{update.authorName}</b></p>
                                    <p>{update.description}</p>
                                </div>
                                <button onClick={() => DeleteUpdate(update?.id ?? "")}>Remove this one</button>
                            </li>        
                            ))
                        }
                        {
                            updates?.filter((u) => u.teamId === userInfo?.team).length === 0 && userInfo?.team !== null &&(
                                <li className='UpdatesItemContainer'>                    
                                <div className='ItemsUpdates'>
                                    <p>No updates has been posted</p>
                                </div>                                
                            </li>   
                            )
                        }
                        {
                            userInfo?.team === null &&(
                                <li className='UpdatesItemContainer'>                    
                                <div className='ItemsUpdates'>
                                    <p>You need a team to post something here</p>
                                </div>                                
                            </li>   
                            )
                        }
                    </ul>
                </article>
            </div>
            <div className='ButtonsUpdate'>
                <button className='' style={{backgroundColor: '#910012'}} onClick={HideAllUpdates}>Hide All</button>
                <button className='' style={{backgroundColor: 'black'}} onClick={() => HaveTeamCheck()}>{close === false ? 'Create new update' : 'Close pop up'}</button>
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
                            <p>{teamMember.username.substring(0,30)}</p>
                            <img src="https://www.svgrepo.com/show/532362/user.svg" onClick={() => navigate(`/application/user/${teamMember.username}`)} alt="user icon" />
                            {
                                teamMember.loggedIn === true ? 
                                <img src="https://www.svgrepo.com/show/335281/status-connected.svg" style={{width: '5%'}}alt="online status" /> :
                                <img src="https://www.svgrepo.com/show/335283/status-disconnected.svg" style={{width: '5%'}}alt="offline status" />
                            }
                            
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
                        
                        loading === true ? <p>loading...</p> : (userInfo?.team === '') || (userInfo?.team === null) ? 'You are not part of a team' : teamInfo?.teamName.substring(0,47)
                    }
                    </h4>
                    </div>
                </div>
                
            </div>
        </section>
        <CreateNewUpdate close={close} setClose={setClose} GetData={GetAllUpdates}/>
    </>
  );
}

export default Updates_Team;