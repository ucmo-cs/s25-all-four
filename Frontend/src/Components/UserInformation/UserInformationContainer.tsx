import React from 'react';
import './css/UserInformationContainer.css'
import { IUserInformationProps } from '../../Pages/UserInformation';
import UpperUI from './UpperUI';

const UserInformationContainer: React.FC<IUserInformationProps> = ({userInformation}) => {
  return (
    <section className='UserInformationContainer'>    
        <UpperUI userInformation={userInformation}/>    
    </section>
  );
}

export default UserInformationContainer;