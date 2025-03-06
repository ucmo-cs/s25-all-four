import React from 'react';
import { IUserInformationProps } from '../../Pages/UserInformation';
import './css/UpperUI.css'

const UpperUI: React.FC<IUserInformationProps> = ({userInformation}) => {
  return (
    <article className='UIC_Article_Upper'>
        <div className='UIC_IMages'>
            <img src="https://www.svgrepo.com/show/486506/user-profile-filled.svg" 
                alt="Profile picture" />
        </div>
        <div className='UIC_BasicInfo'>
            <div className='UI_BasicInfo_Username_NickName'>
                <h1>{userInformation.username.toUpperCase().substring(0,16)}</h1>
                <h3>
                    {
                        userInformation.nickName ? `(${userInformation.nickName})` : ''
                    }
                </h3>
            </div>
            <div className='UIC_DivInfo'>
            <h4>Email: </h4>
            <p>{userInformation.email}</p>
            </div>
            <div className='UIC_DivInfo'>
                <h4>Phone number:</h4>
                <p>
                    {
                        userInformation.phone
                        ? userInformation.phone
                        : 'No phone number provided'
                    }
                </p>
            </div>
            <div className='UIC_DivInfo'>
                <h4>Address: </h4>
                <p>
                    {
                        userInformation.address
                        ? userInformation.address
                        : 'No address provided'
                    }
                </p>
            </div>
        </div>
        <div className='ButtonUIContainer'>
            <div className='ButtonUI'>
                <button>Add friend</button>
                <img
                    src="https://www.svgrepo.com/show/447863/add-friend.svg" 
                    alt="add firend" />
            </div>
            <div className='ButtonUI'>
                <button >send message</button>
                <img
                    src="https://www.svgrepo.com/show/522607/message-text.svg" 
                    alt="send message"/>
            </div>
        </div>
    </article>
  );
}

export default UpperUI;