import React from 'react';
import './css/AllInformation.css'
import GetUserHook from '../../Shared/GetUserHook';

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
  const {userInfo, loading, error} = GetUserHook()
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
                                  modify === true ? <input type="date" className='BirthdayInput' value={birthday} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBirthday(e.target.value)} /> 
                                  : (userInfo?.birthday?.toString() === '' ) || (userInfo?.birthday === null ) ? <p>No birthday provided</p> : userInfo?.birthday?.toString().substring(0,10)
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
                                modify === true ? <input type="text"  className='BirthdayInput' value={nickName} onChange={(e) => setNickName(e.target.value)} style={{marginLeft: '2vw'}} placeholder='Add your nickname' />  
                                : (userInfo?.nickName === '' ) || (userInfo?.nickName === null ) ? <p style={{marginLeft: '2vw'}}>No nickname provided</p> : <p style={{marginLeft: '2vw'}}>{userInfo?.nickName}</p>
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
                        <h2>Current team project</h2>
                        <div className='SelectionBody'>
                          <img src="https://www.svgrepo.com/show/247760/left-arrow-back.svg" 
                               alt="" />
                          <h4>No team selected</h4>
                          <img style={{transform: 'rotateZ(180deg)'}} src="https://www.svgrepo.com/show/247760/left-arrow-back.svg" 
                               alt="" />
                        </div>
                        <button>Request Join</button>
                      </article>
                  </div>
                  <div className='TeamSelectionContainer'>
                        <div className='AddProjectsTeam'>
                          <button>Add new project</button>
                          <select name="" id="">
                            <option value="">No project selected</option>
                            <option value="">Project 1</option>
                            <option value="">Project 2</option>
                          </select>
                          <button>Add project</button>
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