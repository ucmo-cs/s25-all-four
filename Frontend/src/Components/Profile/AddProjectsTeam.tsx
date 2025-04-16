import React, { useRef } from 'react';
import { UserInformaion } from '../Login/RegisterForm';
import { Team } from './NewTeam';
import { Project } from './NewProject';

interface IAddProjectsTeamProps {
  userInfo: UserInformaion | null;
  teamsInfo: Team[] | null;
  teamInfo: Team | null;
  closeTeamPopUp: boolean;
  projects: Project[];
  setCloseTeamPopUp: (value: boolean) => void;
  closeProjectPopUp: boolean;
  setCloseProjectPopUp: (value: boolean) => void;
  setUpdateProjects: (change: boolean) => void;
  updateProject: boolean;  
}

const AddProjectsTeam: React.FC<IAddProjectsTeamProps> = ({
  userInfo,
  teamsInfo,
  teamInfo,
  closeTeamPopUp,
  setCloseTeamPopUp,
  closeProjectPopUp,
  projects,
  setCloseProjectPopUp,
  setUpdateProjects,
  updateProject,
  
}) => {

  const removeTeamId = useRef<HTMLSelectElement>(null);
  const removeProjectId = useRef<HTMLSelectElement>(null);
  const joinProjectId = useRef<HTMLSelectElement>(null)

  async function deleteTeamById(): Promise<void> {
    const teamId: string = removeTeamId.current?.value ?? "";
    if (!teamId || teamId === 'null') return;

    try {
      await fetch(`https://localhost:7010/api/Team/${teamId}`, { method: 'DELETE' });
      alert('Team removed successfully');
    } catch (e) {
      alert('Failed to remove team: ' + e);
    } finally {
      window.location.reload()
    }
  }
  const DeleteProjectByID = async (): Promise<void> => {
    const projectID: string = removeProjectId.current?.value ?? ""
    if(projectID === "" || projectID === null) return;

    const url: string = `https://localhost:7010/api/Project/${projectID}`;
    try {
      const response = await fetch(url, { method: "DELETE" });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setUpdateProjects(!updateProject);
    } catch (e) {
      alert("Failed to remove project: " + e);
    }
  };

  const HandleJoinProject = async(): Promise<void> => {

    const url: string = "https://localhost:7010/api/Project";
    var selectedProject: Project | undefined = projects.find(SP => SP.id === joinProjectId.current?.value)
    var allSelectedProejct: Project[] | undefined = projects.filter(p => p.id === joinProjectId.current?.value)
    var alreadyInProject: Project | undefined = projects.find(SP => SP.ownerID === allSelectedProejct?.find(p => p.id === SP.ownerID)?.ownerID)

    if(alreadyInProject){
      alert("You're already part of this project")
      return;
    }
    if(!selectedProject) return
    try{
      const response = await fetch(url,{
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...selectedProject,
          ownerID: userInfo?.id 
        })
      })
      if(!response.ok) throw "Something went wrong"
      setUpdateProjects(!updateProject);
    }catch(e){
      alert(e + "\nWe were not able to join you in that group")
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
          <select style={{ border: '2px solid black' }} ref={removeProjectId}>
            <option value=''>Select project to remove</option>
            {
              projects.filter(p => p.teamID === teamInfo?.id && p.creatorID === userInfo.id &&  p.ownerID === "" ).map((project, index) => (
                <option 
                  key={index} 
                  value={project.id}>                
                  {
                    project.name
                  }
                </option>
              ))
            }            
          </select>
          <button style={{ border: '2px solid black' }} onClick={DeleteProjectByID}>Remove project</button>
        </>
      )}

      <select style={{ border: '2px solid gray' }} ref={joinProjectId}>
        <option value=''>No project selected</option>
        {
          projects.filter(p => p.teamID === teamInfo?.id && p.ownerID === "").map((project, index) => (
            <option 
              key={index} 
              value={project.id}>                
              {
                project.name
              }
            </option>
          ))
        }       
      </select>
      <button style={{ border: '2px solid gray' }} onClick={HandleJoinProject}>Add project</button>
    </div>
  );
};

export default AddProjectsTeam;