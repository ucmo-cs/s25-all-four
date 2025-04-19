import React from 'react';
import { IUserInformationProps } from '../../Pages/UserInformation';
import './css/BottomUI.css'
import GetAllProjects from '../../Shared/GetAllProjects';
import GetAllTeamsHook from '../../Shared/GetAllTeamsHook';

const BottomUI: React.FC<IUserInformationProps> = ({userInformation}) => {
  const {projects} = GetAllProjects(false)
  const {teamsInfo} = GetAllTeamsHook()

  return (
    <section className='BottomUI'>
      <div className='BirthdayPosition'>
        <div className='BPComponent' style={{borderRight: '2px solid white'}}>
          <b style={{marginRight: '1em'}}>Birthday: </b>
          {
            !userInformation.birthday ? 'No birthday provided' :
            userInformation?.birthday?.toString().substring(0,10)
          }
        </div>
        <div className='BPComponent'>
          <b style={{marginRight: '1em'}}>Role: </b>
          {userInformation.position}
        </div>
        <div className='BPComponent' style={{borderLeft: '2px solid white'}}>
          <b style={{marginRight: '1em'}}>Team: </b>
          {
            !userInformation.team ? 'No team'
            : teamsInfo?.find(t => t.id === userInformation.team)?.teamName
          }
        </div>
      </div>
      <div className='UserDescriptionPorjects'>
          <div className='UserDescription'>
            <h3>Description</h3>
            <p>
            {
              !userInformation.information ? 'No information provided' 
              : userInformation.information
            }
            </p>
          </div>
          <div className='UserProjects'>
            <h3>Projects:</h3>
            <ul>
            {
              projects.filter(p => p.ownerID === userInformation.id).length === 0 ?
              <li>No projects found</li> :
              projects.filter(p => p.ownerID === userInformation.id)
                .map((project, index) => (
                  <li key={index}>{project.name}</li>
                ))
            }
            </ul>
          </div>
      </div>
    </section>
  );
}

export default BottomUI;