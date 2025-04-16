import React, { useEffect, useState } from 'react';
import GetAllUsersHook from '../../Shared/GetAllUsersHook';
import NewProject, { Project } from './NewProject';
import NewTeam from './NewTeam';
import { UserInformaion } from '../Login/RegisterForm';
import ChangeTeamComponent from './ChangeTeam';
import GetAllTeamsHook from '../../Shared/GetAllTeamsHook';
import GetTeamHook from '../../Shared/GetTeamHook';
import AddProjectsTeam from './AddProjectsTeam';
import { Team } from './NewTeam';
import { useNavigate } from 'react-router-dom';
// import Updates_Team from '../Dashboard/Updates_Team';

interface IModifyMoreBottom {
  userInfo: UserInformaion | null;
}

const AllInforBottom: React.FC<IModifyMoreBottom> = ({ userInfo }) => {

  const [closeTeamPopUp, setCloseTeamPopUp] = useState<boolean>(true);
  const [closeProjectPopUp, setCloseProjectPopUp] = useState<boolean>(true);
  const [teamIndex, setTeamIndex] = useState<number>(0);  
  const [changeTeamB, setChangeTeamB] = useState<boolean>(false);
  const [changeTeamC, setChangeTeamC] = useState<boolean>(false)
  const [projects, setProjects] = useState<Project[]>([])
  
  const navigate = useNavigate()
  const { teamInfo } = GetTeamHook(changeTeamB);
  const { teamsInfo, load } = GetAllTeamsHook();
  const { usersInfo } = GetAllUsersHook();

  const SelectTeam = async (teamID_: string | null, join: boolean) => {
    await ChangeTeam(teamID_, join);
    GetAllTeamsHook()
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

  const HandleGetProjects = async(): Promise<void> =>{
    const url: string = "https://localhost:7010/api/Project"
    try{
      const response = await fetch(url)
      if(!response.ok) throw "This is not working"
      const projectData: Project[] = await response.json();
      setProjects(projectData)
    }catch(e){
      alert(e)
    }
  }

  useEffect(()=>{    
    HandleGetProjects()
    console.log(projects)    
  },[changeTeamC])
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
          teamInfo={teamInfo}
          updateProject={changeTeamC}
          setUpdateProjects={(setChangeTeamC)}
          userInfo={userInfo}
          projects={projects}
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
            {projects.filter(p => p.teamID === teamInfo?.id && p.ownerID === userInfo?.id).length === 0 ? (
              <div className='ProjectItem'>
                <h3>No projects available</h3>
              </div>
            ) : (
              projects
                .filter(p => p.teamID === teamInfo?.id && p.ownerID === userInfo?.id)
                .map((project, key) => (
                  <div
                    className='ProjectItem'
                    key={key}
                    onClick={() => navigate(`/application/project/${project.id}`)}
                  >
                    <h3>{project.name.substring(0, 26)}</h3>
                    <img
                      src='https://www.svgrepo.com/show/500599/info-filled.svg'
                      alt='info'
                    />
                  </div>
                ))
            )}
            </div>
          </article>
        </div>
      </div>

      <NewProject 
        userInfo={userInfo}
        close={closeProjectPopUp} 
        setClose={setCloseProjectPopUp} 
        teamID={teamInfo?.id}
        updateProject={changeTeamC}
        setUpdateProjects={(setChangeTeamC)}
        />
      <NewTeam 
        close={closeTeamPopUp} 
        setClose={setCloseTeamPopUp} 
        />
    </section>
  );
};

export default AllInforBottom;