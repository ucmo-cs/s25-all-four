import React, { useEffect, useRef, useState } from 'react';
import './css/NewTeam.css'
import { IClose } from './NewProject';
import GetUserHook from '../../Shared/GetUserHook';

export interface Team{
  id?: string,
  teamName: string,
  teamDescription: string,
  teamSize: number,
  teamManager: string
}
const NewTeam: React.FC<IClose> = ({close, setClose}) => {

  const [url] = useState<string>('https://localhost:7010/api/Team')
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [teamSize, setTeamSize] = useState<number>()
  const teamContainer = useRef<HTMLDivElement>(null)
  const userInfo = GetUserHook(false)

  async function CreateNewTeam(): Promise<void> {
      try{
        await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            teamName: name, 
            teamDescription: description, 
            teamSize: teamSize,
            teamManager: userInfo.userInfo?.id
          })
        })
      }catch(e){
        alert(e + 'New team failed')
      } finally{
        setName('')
        setDescription('')
        setTeamSize(0)
        setTimeout(() => {
          setClose(!close)
        }, 1000);
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
        close === false&& (
        <section className='NewTeam' ref={teamContainer}>
                <div className='Close' onClick={() => setClose(!close)}>X</div>
                <h1>Create new team</h1>
                <label htmlFor="">Team Name</label>
                <input type="text" placeholder='Type your team name' value={name} onChange={(e) => setName(e.target.value)}/>
                <label htmlFor="">Team description</label>
                <textarea name="" placeholder='Type the description here!' value={description} onChange={(e) => setDescription(e.target.value)} id=""></textarea>
                <label htmlFor="">Team size</label>
                <input type="number"  placeholder='How many people is there?' value={teamSize} onChange={(e) => setTeamSize(Number(e.target.value))}/>
                <button onClick={CreateNewTeam}>Create new project</button>
        </section>

        )    
    }
    </>
  );
}

export default NewTeam;