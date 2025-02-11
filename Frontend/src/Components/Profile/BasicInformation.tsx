import React, { useState } from 'react';
import './css/BasicInformation.css'
import GetUserHook from '../../Shared/GetUserHook'
import { Url } from '../Login/RegisterForm';
import { useNavigate } from 'react-router-dom';

interface IModifyBasic{
    SendChangesToDB: () => Promise<void>;
    setPhone: (value: string) => void;
    setAddres: (value: string) => void;
    setModify: (value: boolean) => void;
    modify: boolean;
    address: string;
    phone: string;
}
const BasicInformation: React.FC<Url & IModifyBasic> = ({url, setPhone,setAddres,setModify,modify,address,phone,SendChangesToDB}) => {

    const navigate = useNavigate();
    const {userInfo, loading, error} = GetUserHook()    
    
    const DeleteUser = async () => {await fetch(url,{method: 'DELETE'}); navigate('/')}
    
    const [modifyImg, setModifyImg] = useState<string>('https://www.svgrepo.com/show/511904/edit-1479.svg')
    function ShakeIcon(index: number): void{
        const Icon = document.querySelectorAll('.Edit_Delete img') as NodeListOf<HTMLImageElement>
        Icon[index].style.transform = 'rotateZ(20deg)'
        setTimeout(() => {
            Icon[index].style.transform = 'rotateZ(-20deg)'            
        }, 100);
        setTimeout(() => {
            Icon[index].style.transform = 'rotateZ(0deg)'
        }, 200);
    }

    async function SetChanges(): Promise<void>{
        setModify(!modify)        
        setModifyImg(modify ? 
            'https://www.svgrepo.com/show/391790/check.svg' :
            'https://www.svgrepo.com/show/511904/edit-1479.svg')
        if(modify === true){
            await SendChangesToDB()
        }
    }

  return (
    <section className='BasicInformation'>
        <article className='BasicInformationContainer'>
            <div className='ProfileImg'>
                <img src="https://www.svgrepo.com/show/486506/user-profile-filled.svg" 
                    alt="prfile img" />
            </div>
            <div className='Name_Email_Phone'>                
                {
                    loading === false ? <h2>{userInfo?.username.toUpperCase()}</h2> :  <h2>Loading...</h2>
                }
                <div className='informationItem'>
                {
                    loading === false ? <p>{userInfo?.email}</p> : <p>Loading...</p>
                }
                    <div className='InformationItemConfig'>
                        <img src="https://www.svgrepo.com/show/509920/eye.svg" 
                            alt="visible" />                        
                        {/* <img src="https://www.svgrepo.com/show/509919/eye-off.svg" 
                            alt="not visible" /> */}
                    </div>
                </div>
                <div className='informationItem'>
                    {
                        modify === true ? <input type="text" placeholder='Add your phone' value={phone} onChange={(e) => setPhone(e.target.value.trim())}/> 
                        : (userInfo?.phone === '' ) || (userInfo?.phone === null ) ? <p>No phone provided</p> : userInfo?.phone
                    }                    
                    <div className='InformationItemConfig'>
                        <img src="https://www.svgrepo.com/show/509920/eye.svg" 
                            alt="visible" />                        
                        {/* <img src="https://www.svgrepo.com/show/509919/eye-off.svg" 
                            alt="not visible" /> */}
                    </div>
                </div>
                <div className='informationItem'>
                    {
                        modify === true ? <input type="text" placeholder='Add your address' value={address} onChange={(e) => setAddres(e.target.value)}/> 
                        : (userInfo?.address === '' ) || (userInfo?.address === null ) ? <p>No address provided</p> : userInfo?.address
                    }                    
                    <div className='InformationItemConfig'>
                        <img src="https://www.svgrepo.com/show/509920/eye.svg" 
                            alt="visible" />                        
                        {/* <img src="https://www.svgrepo.com/show/509919/eye-off.svg" 
                            alt="not visible" /> */}
                    </div>
                </div>
            </div>
            <div className='Edit_Delete'>
                <img src={modifyImg}
                     alt="edit" onMouseEnter={() => ShakeIcon(0)} onClick={SetChanges} />       
                <img src="https://www.svgrepo.com/show/522316/trash.svg" 
                     alt="delete" onClick={DeleteUser} onMouseEnter={() => ShakeIcon(1)}/>       
            </div>
        </article>
    </section>
  );
}

export default BasicInformation;