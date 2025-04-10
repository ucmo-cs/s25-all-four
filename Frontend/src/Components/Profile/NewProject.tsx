import React, { useEffect, useRef, useState } from 'react';
import './css/NewProject.css'
import { UserInformaion } from '../Login/RegisterForm';

export interface IClose{
  setClose: (close: boolean) => void ;
  close: boolean;
}
export interface Project{
  id?: string;
  name: string;
  description: string;
  teamID: string;
  ownerID: string;
  creatorID: string
}
interface NewProjectProp{
  teamID: string | undefined;
  setUpdateProjects: (change: boolean) => void;
  updateProject: boolean;
  userInfo: UserInformaion | null;
}
interface NewProjectProps extends IClose, NewProjectProp {}

const NewProject: React.FC<NewProjectProps> = ({
  close, 
  userInfo,
  setClose, 
  teamID, 
  updateProject,
  setUpdateProjects}) => {

  const [projectName, setProjectName] = useState<string>('')
  const [projectInfo, setProjectInfo] = useState<string>('')
  const teamContainer = useRef<HTMLDivElement>(null)

  const HandlePostProject = async(): Promise<void> =>{
    const url: string = "https://localhost:7010/api/Project"

    if(projectName === ''){
      alert("Please give it a name")
      return;
    }
    if(projectInfo === ''){
      alert("Please provide some information")
      return;
    }
    try{
      const response = await fetch(url,{
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: projectName,
          description: projectInfo,
          teamID: teamID,
          ownerID: '',
          creatorID: userInfo?.id 
        })
      })
      if(!response.ok) throw "Posting project is not working"      

    }catch(e){
      alert(e)
    } finally{
      setProjectName('')
      setProjectInfo('')
      setUpdateProjects(!updateProject)
      setTimeout(() => {
        setClose(!close)
      }, 500);
    }
  }

  function ShowPopUp(): void{    
    setTimeout(() => {
      teamContainer.current!.style.transform = 'translateY(0%)'     
    }, 100);
  }
  
    useEffect(() =>{
      ShowPopUp();
    },[close])

  return (
    <>
      {
        close === false && (
        <section className='NewProject' ref={teamContainer}>
            <div className='Close' onClick={() => setClose(!close)}>X</div>
                <h1>Create new project</h1>
                <label htmlFor="">Project Name</label>
                <input 
                  type="text" 
                  placeholder='Type a name...'
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}                  
                  />
                <label htmlFor="">Project description</label>
                <textarea 
                  name="" 
                  placeholder='Type some description...'
                  id="" 
                  className='textAreaProject'
                  value={projectInfo}
                  onChange={(e) => setProjectInfo(e.target.value)}
                  >
                </textarea>
                <button onClick={HandlePostProject}>Create new project</button>
        </section>
        )
      }
    </>
  );
}

export default NewProject;