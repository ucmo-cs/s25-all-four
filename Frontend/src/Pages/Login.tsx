import React from 'react';
import LoginMenu from '../Components/Login/LoginMenu';

import './Css/Login.css';
const Login: React.FC = () => {
  return (
    <main className='Login'>
        <LoginMenu />
    </main>
  );
}

export default Login;