import React, { useEffect, useRef } from 'react';
import './css/SwitchLogin.css';

interface SwitchLoginProps {
    LoginForm: React.RefObject<HTMLDivElement>;
    Switch: (value: boolean) => void;
}
const SwitchLogin: React.FC<SwitchLoginProps> = ({LoginForm, Switch}) => {
    const contianer = useRef<HTMLElement>(null);

    function change (): void{
        contianer.current!.style.transform = 'translatey(100%)';
        LoginForm.current!.style.transform = 'translatey(-100%)';
        setTimeout(() => {            
            Switch(false);
        }, 800);
    }
    function start(): void{
        setTimeout(() => {      
            contianer.current!.style.transform = 'translatey(0%)';
            LoginForm.current!.style.transform = 'translatey(0%)';
        }, 50);
    }
    useEffect(()=>{
        start();
    },[])
    
  return (
    <section ref={contianer} className='SwitchLogin'>
        <h1>Got an account?</h1>
        <h4 style={{width: '80%', textAlign: 'center'}}>Login to your account and check all the functionalities this website can offer you!</h4>
        <button onClick={change} >Sign up</button>
    </section>
  );
}

export default SwitchLogin;