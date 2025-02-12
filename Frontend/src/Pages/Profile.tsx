import React, { useState } from 'react';
import './Css/Profile.css'
import NavBar from '../Shared/NavBar';
import BasicInformation from '../Components/Profile/BasicInformation';
import AllInformation from '../Components/Profile/AllInformation';
import GetUserHook from '../Shared/GetUserHook'

const Profile: React.FC = () => {

  const {userInfo, loading, error} = GetUserHook()
  const url: string = `https://localhost:7010/api/UserInformation/${userInfo?.id}`;
  const [phone, setPhone] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [modify, setModify] = useState<boolean>(false)
  const [nickName, setNickName] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('')
  const [information, setInformation] = useState<string>('')

  async function SendChangesToDB(): Promise<void> {
    try{      
      await fetch(`https://localhost:7010/api/UserInformation/${userInfo?.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...userInfo,
                phone: phone === '' ? userInfo?.phone :  phone,
                address: address!.trimEnd() === '' ? userInfo?.address : address,
                birthday: birthday === '' ? userInfo?.birthday : birthday,
                nickname: nickName === '' ? userInfo?.nickName : nickName,
                information: information === '' ? userInfo?.information : information

            })
        });
    }catch(e){
        alert(e);
    } finally{
      console.log(userInfo)
        console.log('User information updated')
    }
}

  
  return (
    <main className='Profile'>
         <NavBar/>
         <BasicInformation SendChangesToDB={SendChangesToDB} url={url} phone={phone} address={address} modify={modify} setPhone={setPhone} setAddres={setAddress} setModify={setModify}/>
         <AllInformation modify={modify} nickName={nickName} birthday={birthday} setNickName={setNickName} setBirthday={setBirthday} information={information} setInformation={setInformation}/>
    </main>
  );
}

export default Profile;