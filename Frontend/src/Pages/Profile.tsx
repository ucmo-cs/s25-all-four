import React from 'react';
import './Css/Profile.css'
import NavBar from '../Shared/NavBar';
import ProfileMenu from '../Components/Profile/ProfileMenu';

const Profile: React.FC = () => {
  return (
    <main className='Profile' >
        <NavBar/>         
        <ProfileMenu/>
    </main>
  );
}

export default Profile;