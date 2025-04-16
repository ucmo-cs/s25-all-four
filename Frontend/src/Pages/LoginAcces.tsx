import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserInformaion } from '../Components/Login/RegisterForm';

interface IAccess {
  Dashboard: React.ComponentType;
}

const LoginAccess: React.FC<IAccess> = ({ Dashboard: DashboardComponent }) => {
  // const [code] = useState<string>(localStorage.getItem('UserAC') ?? "");
  const [verified, setVerified] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  async function GetAccessCode(): Promise<boolean> { 
    try{
      const response = await fetch(`https://localhost:7010/api/UserInformation/${localStorage.getItem('UserId')}`);
      const data: UserInformaion = await response.json();
      console.log(data);
      return data.loggedIn === true;
    } catch(e){
      alert("We coudlnt log in")
      return false
    }
  }

  useEffect(() => {
    const verification = async () => {           
      const access: boolean = await GetAccessCode(); 
      if (access === true) {
        setVerified(true);
      } else {
        navigate('/verification');
      }
      setLoading(false);
    };
    verification();
  }, [navigate]);

  if (loading) {
    return <div>Verifying access...</div>;
  }

  return verified ? (
      <DashboardComponent />
  ) : null;
};

export default LoginAccess;
