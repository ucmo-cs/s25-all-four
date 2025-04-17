import React, { useEffect, useState } from 'react';
import { Project } from '../Components/Profile/NewProject';
import GetUserHook from '../Shared/GetUserHook';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Shared/NavBar';
import './Css/ProjectnfoPage.css'
import GetAllUsersHook from '../Shared/GetAllUsersHook';

interface ProjectProp {
  ProjectInformation: Project;
}

const ProjectnfoPage: React.FC<ProjectProp> = ({ ProjectInformation }) => {
  const navigate = useNavigate();
  const { userInfo } = GetUserHook(false); 
  const { usersInfo} = GetAllUsersHook()
  
  const [isValid, setIsValid] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([])

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
  
  useEffect(() =>{
    HandleGetProjects()
  },[])

  useEffect(() => {
    if (userInfo) {
      const isSameTeam = userInfo.team === ProjectInformation.teamID;
      setIsValid(isSameTeam);
      console.log(isSameTeam ? "This is valid" : "This is not valid");
      console.log(`${userInfo.username} User`);
      console.log(`${ProjectInformation.teamID} Project`);
      
      if (!isSameTeam) {
        setTimeout(() => {
          navigate('/application');          
        }, 300);
      }
    }
  }, [userInfo, ProjectInformation, navigate]);

  const HandleLeaveProject = async(): Promise<void> =>{
    const url: string = `https://localhost:7010/api/Project/${ProjectInformation.id}`
    try{
      const response = await fetch(url,{method: "DELETE"})
      if(!response.ok) throw new Error("This is not working")
    }catch(e){
      alert(e);
    } finally{
      navigate('/application/profile');          
    }
  }

  return (
    <>
      {!isValid ? (
        <main>
          <h1>This is not valid</h1>
        </main>
      ) : (
        <main className="ProjectnfoPage">
          <NavBar/>
          <section className='ProjectContainer'>
            <div className='ProjectBox'>
              <h1>{ProjectInformation.name}</h1>
              <h3>Created by: {usersInfo?.find(u => u.id === ProjectInformation.creatorID)?.username}</h3>
              <div className='ProjectDescriptionAndMembers'>
                <p className='ProjectTextDescription'>{ProjectInformation.description}</p>
                <div className='ProjectMembers'>
                  <h3>Project Members</h3>
                  <ul>
                  {
                    usersInfo?.filter(u => u.id === projects.find(p => p.ownerID === u.id)?.ownerID)
                    .map((user,index) => (
                        <li key={index}>{user.username}</li>
                      ))
                    }
                  </ul>
                  <button className='ProjectButton' onClick={HandleLeaveProject}>Leave Project</button>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default ProjectnfoPage;
