import React, { useEffect, useRef, useState } from 'react';
import './css/CreateNewTask.css'
import GetAllUsersHook from '../../Shared/GetAllUsersHook';
import GetTeamHook from '../../Shared/GetTeamHook';
import { UserInformaion } from '../Login/RegisterForm';
import GetUserHook from '../../Shared/GetUserHook';

interface IOpenTask {
    open: boolean;
    setOpen: (close: boolean) => void;
}
export interface ITaskInfo {
    id?: string;
    taskName: string;
    owner: string | undefined;
    dueDate: string;
    information: string;
    teamID: string;
    createdBy: string;
}
const CreateNewTask: React.FC<IOpenTask> = ({open, setOpen}) => {

    const {usersInfo} = GetAllUsersHook()
    const {teamInfo} = GetTeamHook(false)
    const {userInfo} = GetUserHook(false)
    
    const divRef = useRef<HTMLElement>(null)
    const [taskName, setTaskName] = useState<string>('')
    const [taskInformation, setTaskInformation] = useState<string>('')
    const [taskDate, setTaskDate] = useState<string>('')
    const [userList, setUserList] = useState<UserInformaion[]>([])

    const GetUsersFromList = (user:UserInformaion, Add: boolean): void => {        
        if(Add){            
            setUserList([...userList, user])
            console.log(userList)

        }else{
            setUserList(userList.filter((u) => u.id !== user.id))
            console.log(userList)
        }
    }

    const PostTasks = async (): Promise<void> => {
        if (userList.length === 0) {
          alert('Please select at least one user');
          return;
        }
      
        try {
          for (const user of userList) {
            const taskPayload = {
              taskName: taskName,
              dueDate: taskDate.toString(),
              createdBy: userInfo?.username ?? 'Error',
              owner: user.username ?? 'Error',
              teamID: userInfo?.team,
              information: taskInformation,
            };
      
            const url = 'https://localhost:7010/api/TaskUser';
            const response = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(taskPayload)
            });
      
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
          }
        } catch (error) {
          alert(error);
        } finally {
          setTimeout(() => {
            setUserList([]);
            setOpen(!open);
          }, 200);
        }
      };
      
    useEffect(() =>{
        const startingAnimation = () =>{
            setTimeout(() => {
                divRef.current!.style.transform = 'translateY(0%)'                
            }, 100);
        }
        startingAnimation()
    },[open])
  return (
    <>
    {
        open && (
            <article className='CreateNewTask' ref={divRef}>
                <div onClick={() => setOpen(!open)} className='CloseTask' style={{width: '5%'}}>X</div>
                <div className='CreateNewTaskContainer'>
                    <h1 className='AssignTextHeader'>Assign a task</h1>
                    <label htmlFor="TaskName">
                        <h1>Task name</h1>
                        <input type="text" placeholder='Assign to' value={taskName} onChange={((e) => setTaskName(e.target.value))}/>                                                
                    </label>
                    <label htmlFor="" className='AUBOX'>
                        <h1>Assign to</h1>
                        <div className='AssignUsersContainer'>
                        {
                            usersInfo?.filter((u) => u.team === teamInfo?.id).map((user, index) => (
                                <label htmlFor="UserTask" className='UserTask' key={index}>
                                    <input type="checkbox"  placeholder='Task name' onClick={(e) => GetUsersFromList(user, e.currentTarget.checked)}/>
                                    <p>{user.username.substring(0,20)}</p>                                    
                                </label>
                            ))
                        }

                        </div>
                    </label>
                    <label htmlFor="DueDate">
                        <h1>Due date</h1>
                        <input 
                            type="date" 
                            placeholder='Due date' 
                            value={taskDate}
                            onChange={(e) => setTaskDate(e.target.value)}
                            />
                    </label>
                    <label htmlFor="Information">
                        <h1>Task information</h1>
                        <textarea placeholder='Task information' value={taskInformation} onChange={(e) => setTaskInformation(e.target.value)}/>
                    </label>
                    <button onClick={PostTasks}>Assign</button>
                </div>
            </article>
        )
    }        
    </>
  );
}

export default CreateNewTask;