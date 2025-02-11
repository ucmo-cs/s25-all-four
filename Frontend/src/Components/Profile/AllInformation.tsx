import React from 'react';
import './css/AllInformation.css'
import GetUserHook from '../../Shared/GetUserHook';

interface IModifyMore{
  modify: boolean
  birthday: string;
  nickName: string;
  setBirthday: (value: string) => void;
  setNickName: (value: string) => void;
}

const AllInformation: React.FC<IModifyMore> = ({modify, birthday, nickName, setBirthday, setNickName}) => {
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
                              modify
                              </p>
                              <p style={{marginLeft: '2vw'}}>
                                {
                                  modify === true ? <input type="text" /> 
                                  : <p>Not provided</p>
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
                              <p style={{marginLeft: '2vw'}}>Not provided</p>
                          </div>
                        </div>
                      </article>
                  <div className='InformationText'>
                    <div className='InformationTextContainer'>
                        <div className='InformationTextHeader'>
                            <h3>information</h3>
                        </div>
                        <div className='InformationTextInfo'>

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