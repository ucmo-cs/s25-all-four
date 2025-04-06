import React from 'react';
import './css/AllInformation.css'

import AllInforBottom from './AllInforBottom';
import AllInfoTop from './AllInfoTop';
import { UserInformaion } from '../Login/RegisterForm';

export interface IModifyMore{
  modify: boolean
  birthday: string;
  nickName: string;
  information: string;
  userInfo: UserInformaion | null;
  loading: boolean;
  setInformation: (value: string) => void;
  setBirthday: (value: string) => void;
  setNickName: (value: string) => void;
}

const AllInformation: React.FC<IModifyMore> = ({
  modify, 
  birthday, 
  nickName, 
  information, 
  userInfo,
  loading,
  setBirthday, 
  setNickName, 
  setInformation}) => {
    
  return (
    <section className='AllInformation'>
      <div className='AllInformationContainer'>
        <div className='AllinformationInputs'>
          <hr/>
          <AllInfoTop 
            modify={modify} 
            nickName={nickName} 
            information={information}
            birthday={birthday}
            userInfo={userInfo}
            loading={loading}
            setBirthday={setBirthday} 
            setNickName={setNickName}
            setInformation={setInformation}
            />
          <hr/>
          <AllInforBottom userInfo={userInfo}/>
          <hr/>
        </div>
        </div>
        <div className='CopyRights' style={{height: '8%'}}>
        <p>© 2025 Pablo Panchig. All Rights Reserved.</p>
        <p>This website was designed and developed by Pablo Panchig, 
          a student at the University of Central Missouri. Unauthorized 
          use or duplication of content is strictly prohibited without 
          prior written consent. For inquiries or permissions, please 
          contact <a href="https://itspablopanchig.me">Pablo Panchig</a>
        </p>
        <hr />
      </div>
    </section>
  );
}

export default AllInformation;