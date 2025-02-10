import React from 'react';
import './Css/Profile.css'
import NavBar from '../Shared/NavBar';
import BasicInformation from '../Components/Profile/BasicInformation';
import AllInformation from '../Components/Profile/AllInformation';

const Profile: React.FC = () => {
  return (
    <main className='Profile'>
         <NavBar/>
         <BasicInformation/>
         <AllInformation/>
    </main>
  );
}

export default Profile;