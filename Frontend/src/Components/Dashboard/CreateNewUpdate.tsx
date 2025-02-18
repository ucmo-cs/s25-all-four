import React, { useEffect, useRef, useState } from 'react';
import { IClose } from '../Profile/NewProject';
import './css/CreateNewUpdate.css'
import GetUserHook from '../../Shared/GetUserHook';

export interface IUpdate {
    id?: string;
    title: string;
    description: string;
    authorName: string;
    teamId: string;
    dateCreated: string;
    isVisible: boolean;
  }

const CreateNewUpdate: React.FC<IClose> = ({close, setClose}) => {
    
    const divRef = useRef<HTMLElement>(null)
    const [header, setHeader] = useState<string>('')
    const [text, setText] = useState<string>('')
    const {userInfo} = GetUserHook()

    function NewUpdate(): IUpdate {
        return {          
          title: header,
          description: text,
          authorName: userInfo?.username ?? '',
          teamId: userInfo?.team ?? '',
          dateCreated: new Date().toISOString(),
          isVisible: true,
        };
      }

    async function PostUpdate(): Promise<void> {
        const url: string = 'https://localhost:7010/api/Updates'    
        try{
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(NewUpdate())
            });
        } catch(e){
            alert(e)
        } finally{
            window.location.reload()
            setTimeout(() => {
                setClose(!close)
            }, 200);
            setHeader('')
            setText('')
        }
    }

    async function CheckInput(): Promise<void>{
        if(header === '') {
            alert('Please give it a title name')
            return
        }
        if(text === '') {
            alert('Please give the description')
            return
        }
        console.log(NewUpdate())
        await PostUpdate()
    }

    useEffect(() =>{
        const startingAnimation = () =>{
            setTimeout(() => {
                divRef.current!.style.transform = 'translateY(0%)'                
            }, 100);
        }
        startingAnimation()
    },[close])
    return (
    <>
    {
        close === true && (
            <section ref={divRef} className='CreateNewUpdate'>
                <div onClick={() => setClose(!close)} className='Close' style={{width: '5%'}}>X</div>
                <h1>Post a new update</h1>
                <label htmlFor="">Header</label>
                <input type="text" value={header} onChange={(e) => setHeader(e.target.value)} placeholder='Type the header'/>
                <label htmlFor="">TexInformation</label>
                <textarea name=""  value={text} onChange={(e) => setText(e.target.value)} placeholder='Type your message'></textarea>
                <button onClick={CheckInput}>Create new update</button>
            </section>
        )
    }
    </>
  );
}

export default CreateNewUpdate;