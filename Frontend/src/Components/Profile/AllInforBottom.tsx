import React, { useState } from 'react';
import GetAllUsersHook from '../../Shared/GetAllUsersHook';
import NewProject from './NewProject';
import NewTeam from './NewTeam';
import { UserInformaion } from '../Login/RegisterForm';
import ChangeTeamComponent from './ChangeTeam';
import GetAllTeamsHook from '../../Shared/GetAllTeamsHook';
import GetTeamHook from '../../Shared/GetTeamHook';
import AddProjectsTeam from './AddProjectsTeam';
import { Team } from './NewTeam';

interface IModifyMoreBottom {
  userInfo: UserInformaion | null;
}

const AllInforBottom: React.FC<IModifyMoreBottom> = ({ userInfo }) => {
  const [closeTeamPopUp, setCloseTeamPopUp] = useState(true);
  const [closeProjectPopUp, setCloseProjectPopUp] = useState(true);
  const [teamIndex, setTeamIndex] = useState(0);  
  const [changeTeamB, setChangeTeamB] = useState(false);

  const { teamInfo } = GetTeamHook(changeTeamB);
  const { teamsInfo, load } = GetAllTeamsHook();
  const { usersInfo } = GetAllUsersHook();

  const SelectTeam = async (teamID_: string | null, join: boolean) => {
    await ChangeTeam(teamID_, join);
  };

  const ChangeTeam = async (teamId: string | null, join: boolean) => {
    if (!userInfo) return;

    const url = `https://localhost:7010/api/UserInformation/${userInfo.id}`;
    const selectedTeam: Team | undefined = teamsInfo?.[teamIndex];
    
    if (join && selectedTeam && teamId) {
      const members = usersInfo?.filter(u => u.team === selectedTeam.id) ?? [];
      if (members.length >= selectedTeam.teamSize) {
        alert('This team is full, try another');
        return;
      }
    }

    try {
      await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...userInfo, team: teamId ?? '' }),
      });
    } catch (e) {
      alert(e);
    } finally {  
      setChangeTeamB(prev => !prev)
    }
  };  

  return (
    <section className='InformationsContainerLower'>

      <div className='ProjectSelectionContainer'>
        <ChangeTeamComponent

          usersInfo={usersInfo}
          teamsInfo={teamsInfo}
          teamInfo={teamInfo}
          load={load}
          teamIndex={teamIndex}
          setTeamIndex={setTeamIndex}
          SelectTeam={SelectTeam}
        />
      </div>

      <div className='TeamSelectionContainer'>
        <AddProjectsTeam
          userInfo={userInfo}
          teamsInfo={teamsInfo}
          closeTeamPopUp={closeTeamPopUp}
          setCloseTeamPopUp={setCloseTeamPopUp}
          closeProjectPopUp={closeProjectPopUp}
          setCloseProjectPopUp={setCloseProjectPopUp}
        />

        <div className='AddProjectsList'>
          <article className='ProjectList'>
            <div className='ProjectListHeader'>
              <h3>Projects</h3>
            </div>
            <div className='ProjectListBody'>
              {[1, 2, 3, 4].map(i => (
                <div className='ProjectItem' key={i}>
                  <h3>Project - {i}</h3>
                  <img src='https://www.svgrepo.com/show/500599/info-filled.svg' alt='info' />
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>

      <NewProject close={closeProjectPopUp} setClose={setCloseProjectPopUp} />
      <NewTeam close={closeTeamPopUp} setClose={setCloseTeamPopUp} />
    </section>
  );
};

export default AllInforBottom;