import React, { useEffect, useRef } from 'react';
import './css/SwitchRegister.css';

interface SwitchRegisterProps {
  LoginForm: React.RefObject<HTMLDivElement>;
  Switch: (value: boolean) => void;
}
const SwitchRegister: React.FC<SwitchRegisterProps> = ({LoginForm, Switch}) => {
  
  const container = useRef<HTMLDivElement>(null);

  function change(): void{
    container.current!.style.transform = 'translatey(-100%)';
    LoginForm.current!.style.transform = 'translatey(100%)';
    setTimeout(() => {
      Switch(true);      
    }, 800);
  }

  function start(): void{
    setTimeout(() => {      
      container.current!.style.transform = 'translatey(0%)';
      LoginForm.current!.style.transform = 'translatey(0%)';
    }, 50);
  }

  useEffect(() => {
    start();
  },[])
  
  return (
    <section ref={container} className='SwitchRegister'>
        <h1>New here?</h1>
        <h4 style={{width: '80%', textAlign: 'center'}}>Create a new account and check all the functionalities this website can offer you!</h4>
        <button onClick={change}>Sign up</button>
    </section>
  );
}

export default SwitchRegister;