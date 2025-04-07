import React, { useEffect, useState } from 'react';
import './css/NewProject.css'

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
}
interface NewProjectProp{
  teamID: string | undefined;
}
interface NewProjectProps extends IClose, NewProjectProp {}

const NewProject: React.FC<NewProjectProps> = ({close, setClose, teamID}) => {

  const [projectName, setProjectName] = useState<string>('')
  const [projectInfo, setProjectInfo] = useState<string>('')

  const HandlePostProject = async(): Promise<void> =>{
    const url: string = "https://localhost:7010/api/Project"
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
          ownerID: ''
        })
      })
      if(!response.ok) throw "Posting project is not working"      
      else alert("Project created succesfully")
    }catch(e){
      alert(e)
    } finally{
      setClose(!close)
    }
  }

  return (
    <>
      {
        close === false && (
        <section className='NewProject'>
            <div className='Close' onClick={() => setClose(!close)}>X</div>
                <h1>Create new project</h1>
                <label htmlFor="">Project Name</label>
                <input 
                  type="text" 
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}                  
                  />
                <label htmlFor="">Project Name</label>
                <textarea 
                  name="" 
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