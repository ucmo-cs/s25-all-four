import React, { useEffect, useState } from 'react';
import './css/CreateNewTask.css'
import GetAllUsersHook from '../../Shared/GetAllUsersHook';
import GetTeamHook from '../../Shared/GetTeamHook';
import { UserInformaion } from '../Login/RegisterForm';
import GetUserHook from '../../Shared/GetUserHook';

interface IOpenTask {
    open: boolean;
    setOpen: (close: boolean) => void;
}
interface ITaskInfo {
    id?: string;
    taskName: string;
    owner: string | undefined;
    dueDate: string;
    information: string;
    createdBy: string;
}
const CreateNewTask: React.FC<IOpenTask> = ({open, setOpen}) => {

    const {usersInfo} = GetAllUsersHook()
    const {teamInfo} = GetTeamHook()
    const {userInfo} = GetUserHook(false)
    
    const [taskName, setTaskName] = useState<string>('')
    const [taskInformation, setTaskInformation] = useState<string>('')

    const  [userList, setUserList] = useState<UserInformaion[]>([])
    const [task, setTask] = useState<ITaskInfo>({
        taskName: '',
        owner: '',
        dueDate: '',
        information: '',
        createdBy: ''
    })


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
        if(userList.length === 0) return alert('Please select at least one user')

        try{
            for (let i = 0; i < userList.length; i++) {

                setTask({
                    taskName: taskName,
                    dueDate: new Date().toISOString(),
                    createdBy: userInfo?.id ?? 'Error',
                    owner: userList[i].id ?? 'Error',
                    information: taskInformation,
                })

                const url: string = 'https://localhost:7010/api/TaskUser'
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({})
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }                
            }
        }catch(e){
            alert(e)
        } finally{
            setTimeout(() => {
                setUserList([])
                setOpen(!open)
            }, 200);
        }
    }
  return (
    <>
    {
        open && (
            <article className='CreateNewTask'>
                <div onClick={() => setOpen(!open)} className='CloseTask' style={{width: '5%'}}>X</div>
                <div className='CreateNewTaskContainer'>
                    <h1>Assign a task</h1>
                    <label htmlFor="TaskName">
                        <h1>Task name</h1>
                        <input type="text" placeholder='Assign to' value={taskName} onChange={((e) => setTaskName(e.target.value))}/>                                                
                    </label>
                    <label htmlFor="">
                        <h1>Assign to</h1>
                    {
                        usersInfo?.filter((u) => u.team === teamInfo?.id).map((user, index) => (
                            <label htmlFor="UserTask" className='UserTask' key={index}>
                                <input type="checkbox"  placeholder='Task name' onClick={(e) => GetUsersFromList(user, e.currentTarget.checked)}/>
                                <h5>{user.username.substring(0,20)}</h5>                                    
                            </label>
                        ))
                    }
                    </label>
                    <label htmlFor="DueDate">
                        <h1>Due date</h1>
                        <input type="date" placeholder='Due date' />
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