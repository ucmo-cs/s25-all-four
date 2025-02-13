import React from 'react';
import './css/NewProject.css'

export interface IClose{
  setClose: (close: boolean) => void ;
  close: boolean;
}

const NewProject: React.FC<IClose> = ({close, setClose}) => {

  return (
    <>
      {
        close === false && (
        <section className='NewProject'>
            <div className='Close' onClick={() => setClose(!close)}>X</div>
                <h1>Create new project</h1>
                <label htmlFor="">Project Name</label>
                <input type="text" />
                <label htmlFor="">Project Name</label>
                <input type="text" />
                <label htmlFor="">Project Name</label>
                <input type="text" />
                <button>Create new project</button>
        </section>
        )
      }
    </>
  );
}

export default NewProject;