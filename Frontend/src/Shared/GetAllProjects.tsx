import { useEffect, useState } from 'react'
import { Project } from '../Components/Profile/NewProject'

const GetAllProjects = (updateProjects: boolean) => {

    const[projects, setProjects] = useState<Project[]>([])
    const[loadingP, setLoadingP] =useState<boolean>(true)

    const HandleGetProjects = async(): Promise<void> =>{
      const url: string = "https://localhost:7010/api/Project"
      try{
        const response = await fetch(url)
        if(!response.ok) throw "This is not working"
        const projectData: Project[] = await response.json();
        setProjects(projectData)
      }catch(e){
        alert(e)
      }finally{
        setLoadingP(false)
      }
    }
    useEffect(() =>{
      HandleGetProjects()
    },[updateProjects])

  return {projects, loadingP}
}

export default GetAllProjects