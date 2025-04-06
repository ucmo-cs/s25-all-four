import React from 'react';
import { UserInformaion } from '../Components/Login/RegisterForm';
import NavBar from '../Shared/NavBar';
import GetUserHook from '../Shared/GetUserHook';
import './Css/UserInformation.css'
import UserInformationContainer from '../Components/UserInformation/UserInformationContainer';
import { useNavigate } from 'react-router-dom';

export interface IUserInformationProps 
{
    userInformation: UserInformaion
}

const UserInformation: React.FC<IUserInformationProps> = ({userInformation}) => {
    const navigate = useNavigate()
    const {userInfo} = GetUserHook(false)
    
    if(userInformation.username === userInfo?.username){
        navigate('/application/profile')
    }

  return (
    <main className='UserInformation'>        
        <NavBar/>
        <div className='UIB'>
          <UserInformationContainer userInformation={userInformation}/>         
        </div>
    </main>
  );
}

export default UserInformation;