import React from 'react';
import NavbarWM from '../Components/WebMenu/NavbarWM';
import NotFoundWMMain from '../Components/NotFoundWM/NotFoundWMMain';

const NotFoundMW: React.FC = () => {
  return (
    <main className='NotFoundMW'>
         <NavbarWM/>
         <NotFoundWMMain/>
    </main>
  );
}

export default NotFoundMW;