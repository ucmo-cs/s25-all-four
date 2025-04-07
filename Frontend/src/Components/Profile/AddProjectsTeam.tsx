import React, { useRef } from 'react';
import { UserInformaion } from '../Login/RegisterForm';
import { Team } from './NewTeam';
import { Project } from './NewProject';

interface IAddProjectsTeamProps {
  userInfo: UserInformaion | null;
  teamsInfo: Team[] | null;
  closeTeamPopUp: boolean;
  projects: Project[];
  setCloseTeamPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  closeProjectPopUp: boolean;
  setCloseProjectPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProjectsTeam: React.FC<IAddProjectsTeamProps> = ({
  userInfo,
  teamsInfo,
  closeTeamPopUp,
  setCloseTeamPopUp,
  closeProjectPopUp,
  projects,
  setCloseProjectPopUp,
}) => {
  const removeTeamId = useRef<HTMLSelectElement>(null);

  async function deleteTeamById(): Promise<void> {
    const teamId = removeTeamId.current?.value;
    if (!teamId || teamId === 'null') return;

    try {
      await fetch(`https://localhost:7010/api/Team/${teamId}`, { method: 'DELETE' });
      alert('Team removed successfully');
    } catch (e) {
      alert('Failed to remove team: ' + e);
    } finally {
      window.location.reload();
    }
  }

  return (
    <div className='AddProjectsTeam'>
      {userInfo?.position === 'admin' && (
        <>
          <button style={{ border: '2px solid #910012' }} onClick={() => setCloseTeamPopUp(!closeTeamPopUp)}>
            Add new team
          </button>
          <select ref={removeTeamId} style={{ border: '2px solid #910012' }}>
            <option value={'null'}>Select team to remove</option>
            {teamsInfo?.filter(t => t.teamManager === userInfo.id).map(team => (
              <option value={team.id} key={team.id}>
                {team.teamName}
              </option>
            ))}
          </select>
          <button style={{ border: '2px solid #910012' }} onClick={deleteTeamById}>
            Remove team
          </button>
          <button style={{ border: '2px solid black' }} onClick={() => setCloseProjectPopUp(!closeProjectPopUp)}>
            Add new project
          </button>
          <select style={{ border: '2px solid black' }}>
            <option value=''>Select project to remove</option>
            {
              projects.map((project, index) => (
                <option key={index} value={project.id}>
                  {
                    project.name
                  }
                </option>
              ))
            }
            <option value=''>Project 2</option>
          </select>
          <button style={{ border: '2px solid black' }}>Remove project</button>
        </>
      )}

      <select style={{ border: '2px solid gray' }}>
        <option value=''>No project selected</option>
        <option value=''>Project 1</option>
        <option value=''>Project 2</option>
      </select>
      <button style={{ border: '2px solid gray' }}>Add project</button>
    </div>
  );
};

export default AddProjectsTeam;