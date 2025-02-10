import React from 'react';
import './css/Tasks_Team.css'

const Tasks_Team: React.FC = () => {
  return (
    <section className='Tasks_Team'>
        <div className='TaskButtons'>
            <button>Find people</button>
            <button>Open Chats</button>
            <button>Assign task</button>
        </div>
        <div className='DisplayTasks'>
            <div className='DisplayTasksHeader'>
                <p>Your tasks</p>
            </div>
            <article className='DisplayTasksContainer'>
                <div className='TaskElement'>
                        <h1>Task 1</h1>
                        <p>Due date: february 2nd 2024</p>
                        <div className='TaskInformation'>

                        </div>
                <button style={{width: '70%'}}>
                    <p style={{ width: "fit-content" }}>Completed!</p>
                    <img style={{width: '2em'}} src="https://www.svgrepo.com/show/167914/pointer.svg" alt="" />
                </button>
                </div>
                <div className='TaskElement'>
                        <h1>Task 1</h1>
                        <p>Due date: february 2nd 2024</p>
                        <div className='TaskInformation'>

                        </div>
                <button style={{width: '70%'}}>
                    <p style={{ width: "fit-content" }}>Completed!</p>
                    <img style={{width: '2em'}} src="https://www.svgrepo.com/show/167914/pointer.svg" alt="" />
                </button>
                </div>
            </article>
        </div>
    </section>
  );
}

export default Tasks_Team;