import React, { useEffect, useState, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserInformaion } from '../Components/Login/RegisterForm';

interface IAccess{
    Dashboard: React.ComponentType;
}

const LoginAccess: React.FC<IAccess> = ({ Dashboard: DashboardComponent }) => {


    const [code] = useState<string>(localStorage.getItem('UserAC') ?? "")
    const navigate = useNavigate();

    async function GetAccessCode(): Promise<boolean>{        
        
        const response = await fetch(`https://localhost:7010/api/UserInformation/${localStorage.getItem('UserId')}`)
        const data: UserInformaion = await response.json()
        return data.loggedIn === true && code === data.securityCode;
    }

    useEffect(() =>{
        const verification = async() =>{           
            const access: boolean = await GetAccessCode(); 
            if(access === true){                
            } else{
                navigate('/')
            }
        }
        verification();
    },[])    

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DashboardComponent />
        </Suspense>
  );
}

export default LoginAccess;