import React, { useEffect, useRef, useState } from 'react';
import './css/AllInformation.css'
import GetUserHook from '../../Shared/GetUserHook';
import NewProject from './NewProject';
import NewTeam from './NewTeam';
import GetAllTeamsHook from '../../Shared/GetAllTeamsHook';
import GetTeamHook from '../../Shared/GetTeamHook';
import GetAllUsersHook from '../../Shared/GetAllUsersHook';

interface IModifyMore{
  modify: boolean
  birthday: string;
  nickName: string;
  information: string;
  setInformation: (value: string) => void;
  setBirthday: (value: string) => void;
  setNickName: (value: string) => void;
}

const AllInformation: React.FC<IModifyMore> = ({modify, birthday, nickName, setBirthday, setNickName, information, setInformation}) => {
  
  const {userInfo, loading} = GetUserHook()
  const [closeTeamPopUp,setCloseTeamPopUp] = useState<boolean>(true);
  const [closeProjectPopUp, setCloseProjectPopUp] = useState<boolean>(true)
  const [teamIndex, setTeamIndex] = useState<number>(0)
  const { teamsInfo } = GetAllTeamsHook();
  const { usersInfo } = GetAllUsersHook();
  const {teamInfo, load} = GetTeamHook()
  const removeTeamId = useRef<HTMLSelectElement>(null)


  async function ChangeTeam(teamId: string | null, leave: boolean): Promise<void>{

    const url: string = `https://localhost:7010/api/UserInformation/${userInfo?.id}`
    const teamlenght = usersInfo?.filter(t => t.team === teamsInfo![teamIndex].id)    
    if(teamlenght!.length > teamsInfo![teamIndex].teamSize - 1 && leave === false){
      alert('This team is full, try with other team')
      return
    }
    try{
      await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...userInfo,
          team: teamId
        })
      })
    }catch(e){
      alert(e)
    }finally{
      console.log('Team added')
      if(leave === true) alert('Now you are part of ' + teamsInfo![teamIndex].teamName)
      if(leave === false) alert('You left ' + teamInfo?.teamName)
      window.location.reload()
    }
  }

 
  async function DeleteTeamById(): Promise<void> {
    const url: string = `https://localhost:7010/api/Team/${removeTeamId.current?.value}`
    if(removeTeamId.current?.value !== 'null'){
      try {
        await fetch(url, { method: 'DELETE' });
        alert('Team removed successfully');
        window.location.reload();
      } catch (e) {
        alert('Failed to remove team: ' + e);
      }
      finally{
        window.location.reload()
      }
    }
  }

  async function SelectTeam(teamID_: string | null, leave: boolean): Promise<void>{
    await ChangeTeam(teamID_, leave)
  }

  useEffect(()=>{
    const see = () =>{
      console.log(removeTeamId.current?.value)
    }
    see()
  },)

  return (
    <section className='AllInformation'>
      <div className='AllInformationContainer'>
        <div className='AllinformationInputs'>
          <hr/>
          <div className='InformationsContainer'>
                <article className='InformationArticle'>
                  <h2>More information</h2>
                  <div className='InformationItemContainer'>
                    <div className='InformationItem'>
                        <p style={{backgroundColor: '#D9001B', color: 'white', height: '70%', width: '35%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.5em'}}>
                        Birthday
                        </p>
                        <p style={{marginLeft: '2vw'}}>
                          {
                            modify === true 
                            ? <input type="date" className='BirthdayInput' value={birthday} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBirthday(e.target.value)} /> 
                            : (userInfo?.birthday?.toString() === '' ) || (userInfo?.birthday === null ) ? <p>No birthday provided</p> : <p>
                              {
                                loading === true ? 'loading' : userInfo?.birthday?.toString().substring(0,10)
                              }
                            </p>
                          }
                        </p>
                    </div>
                    <div className='InformationItem'>
                    <p style={{backgroundColor: '#D9001B', color: 'white', height: '70%', width: '35%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.5em'}}>
                      Position
                    </p>
                        <p style={{marginLeft: '2vw'}}>
                        {
                          loading === true ? <p>Loading...</p> : userInfo?.position
                        }
                        </p>
                    </div>
                    <div className='InformationItem'>
                    <p style={{backgroundColor: '#D9001B', color: 'white', height: '70%', width: '35%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.5em'}}>
                      NickName
                    </p>
                        {
                          modify === true 
                          ? <input type="text"  className='BirthdayInput' value={nickName} onChange={(e) => setNickName(e.target.value)} style={{marginLeft: '2vw'}} placeholder='Add your nickname' />  
                          : (userInfo?.nickName === '' ) || (userInfo?.nickName === null ) ? <p style={{marginLeft: '2vw'}}>No nickname provided</p> : <p style={{marginLeft: '2vw'}}>
                          {loading === true ? 'Loading...' : userInfo?.nickName }
                            </p>
                        }
                    </div>
                  </div>
                </article>
            <div className='InformationText'>
              <div className='InformationTextContainer'>
                  <div className='InformationTextHeader'>
                      <h3>information</h3>
                  </div>
                  <div className='InformationTextInfo'>
                        {
                          modify === true ? <textarea placeholder='Write your information here...' rows={4}  value={information} onChange={(e) => setInformation(e.target.value)}/> :
                          (userInfo?.information === '' ) || (userInfo?.information === null ) ? <p>No information provided</p> : <p>{userInfo?.information}</p>
                        }
                  </div>

              </div>
            </div>
          </div>
          <hr/>
          <div className='InformationsContainerLower'>
            <div className='ProjectSelectionContainer'>
                <article className='ProjectSelection'>
                  <h2>Current team project:_ 
                    {
                      (userInfo?.team === null) || (userInfo?.team === '') ? <p>No team</p> : 
                      load === true ? <p>Loading...</p> :<p>{teamInfo?.teamName}</p>
                    }
                    </h2>
                  <div className='SelectionBody'>
                    <img src="https://www.svgrepo.com/show/247760/left-arrow-back.svg" 
                          alt="" 
                          onClick={() => setTeamIndex(teamIndex > 0 ? teamIndex - 1 : teamIndex - 0)}/>
                    <div>
                        {
                          teamsInfo &&(
                            teamsInfo!.length >= 1 ? <h4 onChange={() => (console.log(teamsInfo[teamIndex].teamName))}>{teamsInfo[teamIndex].teamName}</h4> : <p>No team</p>
                          )
                        }
                        {
                          teamsInfo &&(
                            teamsInfo!.length >= 1 ? <p>{teamsInfo[teamIndex].teamDescription}</p> : <p>No team</p>
                          )
                        }
                        {
                          teamsInfo &&(
                            teamsInfo!.length >= 1 ? <p>Size of team: {teamsInfo[teamIndex].teamSize}</p> : <p>No team size available</p>
                          )
                        }
                        {
                          teamsInfo &&(
                            teamsInfo!.length >= 1 ? <p>Current size of team: {usersInfo?.filter(t => t.team === teamsInfo![teamIndex].id).length }</p> : <p>No team size available</p>
                          )
                        }
                    </div>
                    <img style={{transform: 'rotateZ(180deg)'}} 
                          src="https://www.svgrepo.com/show/247760/left-arrow-back.svg" 
                          alt="" 
                          onClick={() => setTeamIndex(teamIndex < teamsInfo!.length - 1? teamIndex + 1 : teamIndex - 0)}
                          />
                  </div>
                  <div className='ButtonsTeam'>
                  <button onClick={() => SelectTeam(teamsInfo?.[teamIndex]?.id ?? "", true)}>Join</button>
                    {
                      userInfo?.team !== null && <button onClick={() => SelectTeam(null, false)}>Leave team</button>
                    }
                  </div>
                </article>
            </div>
            <div className='TeamSelectionContainer'>
                  <div className='AddProjectsTeam'>
                    {
                      userInfo?.position === 'admin' && 
                      (
                        <>
                          <button style={{border: '2px solid #910012'}} onClick={() => setCloseTeamPopUp(!closeTeamPopUp)}>Add new team</button>                              
                          <select ref={removeTeamId} style={{border: '2px solid #910012'}}name="" id="" >
                          <option value={'null'}>Select team to remove</option>
                          {
                            teamsInfo && teamsInfo.length > 0 && (
                              teamsInfo.filter(t => t.teamManager === userInfo!.id).map((team, index) => (
                                  <option value={team.id} key={index}>
                                    {team.teamName}
                                  </option>
                                ))
                            )
                          }
                          </select>
                          <button style={{border: '2px solid #910012'}} onClick={DeleteTeamById}>Remove team</button>
                          <button style={{border: '2px solid black'}}onClick={() => setCloseProjectPopUp(!closeProjectPopUp)}>Add new project</button>
                          <select style={{border: '2px solid black'}} name="" id="">
                          <option value="">Select project to remove</option>
                          <option value="">Project 1</option>
                          <option value="">Project 2</option>
                          </select>
                          <button style={{border: '2px solid black'}}>Add project</button>
                        </>
                      )
                    }                                              
                    <select style={{border: '2px solid gray'}} name="" id="">
                      <option value="">No project selected</option>
                      <option value="">Project 1</option>
                      <option value="">Project 2</option>
                    </select>
                    <button style={{border: '2px solid gray'}}>Add project</button>                    
                  </div>
                  <div className='AddProjectsList'>
                    <article className='ProjectList'>
                      <div className='ProjectListHeader'>
                        <h3>Projects</h3> 
                      </div>
                      <div className='ProjectListBody'>
                          <div className='ProjectItem'>
                              <h3>Project - 1</h3>
                              <img src="https://www.svgrepo.com/show/500599/info-filled.svg" 
                                    alt="" />
                          </div>
                          <div className='ProjectItem'>
                              <h3>Project - 1</h3>
                              <img src="https://www.svgrepo.com/show/500599/info-filled.svg" 
                                    alt="" />
                          </div>
                          <div className='ProjectItem'>
                              <h3>Project - 1</h3>
                              <img src="https://www.svgrepo.com/show/500599/info-filled.svg" 
                                    alt="" />
                          </div>
                          <div className='ProjectItem'>
                              <h3>Project - 1</h3>
                              <img src="https://www.svgrepo.com/show/500599/info-filled.svg" 
                                    alt="" />
                          </div>
                      </div>
                    </article>
                  </div>
            </div>
          </div>
          <hr/>
          <NewProject close={closeProjectPopUp} setClose={setCloseProjectPopUp}/>
          <NewTeam close={closeTeamPopUp} setClose={setCloseTeamPopUp}/>
        </div>
        </div>
        <div className='CopyRights' style={{height: '8%'}}>
        <p>© 2025 Pablo Panchig. All Rights Reserved.</p>
        <p>This website was designed and developed by Pablo Panchig, 
          a student at the University of Central Missouri. Unauthorized 
          use or duplication of content is strictly prohibited without 
          prior written consent. For inquiries or permissions, please 
          contact <a href="https://itspablopanchig.me">Pablo Panchig</a>
        </p>
        <hr />
      </div>
    </section>
  );
}

export default AllInformation;