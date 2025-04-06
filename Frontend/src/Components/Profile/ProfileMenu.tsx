import React, { useRef, useState } from 'react';
import BasicInformation from './BasicInformation';
import AllInformation from './AllInformation';
import GetUserHook from '../../Shared/GetUserHook';

const ProfileMenu: React.FC = () => {

    const [userChange, setUserChange] = useState<boolean>(false)
    const {userInfo, loading} = GetUserHook(userChange)
    const url: string = `https://localhost:7010/api/UserInformation/${userInfo?.id}`;
    const [phone, setPhone] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [modify, setModify] = useState<boolean>(false)
    const [nickName, setNickName] = useState<string>('');
    const [birthday, setBirthday] = useState<string>('')
    const [information, setInformation] = useState<string>('')
    const profileContainer = useRef<HTMLElement>(null);
    const span = useRef<HTMLSpanElement>(null)
  
  async function SendChangesToDB(): Promise<void> {
    if(
      phone === '' && 
      address === '' &&
      nickName === '' &&
      birthday === '' &&
      information === ''
    ){
      alert('No changes has been made')
      return;
    }  
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
      setAddress('')
      setPhone('')
      setNickName('')
      setBirthday('')
      setInformation('')    
      setUserChange(!userChange)
    }
  }
  

  return (
    <section className='ProfileMenu' ref={profileContainer}>
        <span ref={span}></span>
         <BasicInformation 
            SendChangesToDB={SendChangesToDB} 
            url={url} phone={phone} 
            address={address} 
            modify={modify} 
            setPhone={setPhone} 
            setAddres={setAddress} 
            setModify={setModify}
        />
        <AllInformation 
            modify={modify} 
            nickName={nickName} 
            birthday={birthday} 
            information={information} 
            userInfo={userInfo}
            loading={loading}
            setNickName={setNickName} 
            setBirthday={setBirthday} 
            setInformation={setInformation}
        />
    </section>
  );
}

export default ProfileMenu;