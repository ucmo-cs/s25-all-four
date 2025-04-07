import React, { useEffect, useState } from 'react';
import './css/Tasks_Team.css'
import GetUserHook from '../../Shared/GetUserHook'
import { Link } from 'react-scroll';
import CreateNewTask, { ITaskInfo } from './CreateNewTask';
import GetTeamHook from '../../Shared/GetTeamHook';

const Tasks_Team: React.FC = () => {

    const {userInfo} = GetUserHook(false)
    const [openNewTask, setOpenNewTask] = useState<boolean>(false)
    const [taskList, setTaskList] = useState<ITaskInfo[]>([])
    const {teamInfo} = GetTeamHook(false)

    const HandleGetTasks = async(): Promise<void> =>{
        const url: string = 'https://localhost:7010/api/TaskUser'
        try{
            const response = await fetch(url)
            if(!response.ok) throw "Something is not working"
            const data: ITaskInfo[] = await response.json();
            setTaskList(data)
        }catch(e){
            alert('Something is not working' + e)
            setTaskList([])
        }
    }

    const HandleRemoveTask = async(id: string): Promise<void> =>{
        const url: string = `https://localhost:7010/api/TaskUser/${id}`
        try{
            await fetch(url,{method: 'DELETE'})
        } catch(e:any){
            alert(e)
        }
    }

    useEffect(() =>{
        HandleGetTasks()
        console.log(taskList)
    },[])

    const HaveATeamCheck = (): void =>{
        if(!teamInfo?.id){
             alert('Please join a team first')
             return
            }
        setOpenNewTask(prev => !prev)
    }
  return (
    <section className='Tasks_Team'>
        <div className='TaskButtons'>
            <Link to="ScrollFind" className='LinkDashboard'>
                <button style={{border: 'none'}}>Find people</button>
            </Link>
            <button>Open Chats</button>
            {
                userInfo?.position === 'admin' && <button onClick={HaveATeamCheck}>{openNewTask ? 'Close' : "Assign tasks"}</button>
            }
            
        </div>
        <div className='DisplayTasks'>
            <CreateNewTask open={openNewTask} setOpen={setOpenNewTask}/>
            
            <div className='DisplayTasksHeader'>
            <p>Your tasks</p>
            </div>
            <article className='DisplayTasksContainer'>
            {
            (!taskList || taskList.filter(t => t.owner === userInfo?.username && t.teamID === teamInfo?.id).length === 0) ? (
                <div className="TaskElement">
                <h1>No tasks assigned</h1>
                {/* <p>Due date: February 2nd, 2024</p> */}
                <div className="TaskInformation">---</div>
                <button style={{ width: "70%" }}>
                    <p style={{ width: "fit-content" }}>Well Done!</p>

                </button>
                </div>                
            ) : (
                taskList
                .filter(t => t.owner === userInfo?.username && t.teamID === teamInfo?.id)
                .map((task, index) => (
                    <div className="TaskElement" key={index}>
                    <h1>{task.taskName}</h1>
                    <p>Due date: {task.dueDate.substring(0,10)}</p>
                    <div className="TaskInformation">{task.information}</div>
                    <button style={{ width: "70%" }} onClick={() => HandleRemoveTask(task.id ?? "")}>
                        <p style={{ width: "fit-content" }}>Completed!</p>
                        <img
                        style={{ width: "2em" }}
                        src="https://www.svgrepo.com/show/167914/pointer.svg"
                        alt=""
                        />
                    </button>
                    </div>
                ))
            )
            }                        
            </article>
        </div>
    </section>
  );
}

export default Tasks_Team;