import React from 'react';
import NotFoundWMMain from '../Components/NotFoundWM/NotFoundWMMain';
import NavBar from '../Shared/NavBar';

const NotFoundApp: React.FC = () => {
  return (
    <main className='NotFoundApp'>
        <NavBar/>
        <NotFoundWMMain/>
    </main>
  );
}

export default NotFoundApp;