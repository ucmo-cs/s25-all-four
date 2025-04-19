import React from 'react';
import './css/UserInformationContainer.css'
import { IUserInformationProps } from '../../Pages/UserInformation';
import UpperUI from './UpperUI';
import BottomUI from './BottomUI';

const UserInformationContainer: React.FC<IUserInformationProps> = ({userInformation}) => {
  return (
    <section className='UserInformationContainer'>    
        <UpperUI userInformation={userInformation}/>
        <BottomUI userInformation={userInformation}/>
    </section>
  );
}

export default UserInformationContainer;