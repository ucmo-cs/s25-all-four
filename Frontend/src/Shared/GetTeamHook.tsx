import React, { useEffect, useState } from 'react'
import { Team } from '../Components/Profile/NewTeam';
import GetAllTeamsHook from './GetAllTeamsHook';
import { UserInformaion } from '../Components/Login/RegisterForm';

const GetTeamHook = () => {

   const storedUserId = localStorage.getItem('UserId') ?? "";  
    const [teamInfo, setUserInfo] = useState<Team | null>(null);
    const [load, setLoading] = useState<boolean>(true);
    const [er, setError] = useState<string | null>(null);
    const {teamsInfo} = GetAllTeamsHook();
    const [URL, setURL] = useState<string>('');

    async function GetCurrentURL(): Promise<void> {
        
        const response = await fetch(`https://localhost:7010/api/UserInformation/${localStorage.getItem('UserId')}`)
        const data: UserInformaion = await response.json();
        console.log(data.team)
        const getTeam = teamsInfo?.find(t => t.id === data?.team);
        
        setURL(`https://localhost:7010/api/Team/${getTeam?.id}`);
        // console.log(`https://localhost:7010/api/Team/${getTeam?.id}` + ' I got this');
    }

    useEffect(() => {
        if (!storedUserId) {
            setLoading(false);
            return;
        }
        const fetchUser = async () => {
        try {
            await GetCurrentURL();            
        } catch (err: any) {
          console.error("Failed to fetch team info:", err);
          setError(err.message || "Unknown error");
        } finally {
        const response = await fetch(URL);
          const text = await response.text();
          if (!text) {
            console.warn("Empty response received from the server.");
            setUserInfo(null);
          } else {
            const data: Team = JSON.parse(text);
            setUserInfo(data);
          }
          setLoading(false);
        }
      };
      fetchUser();
    }, [storedUserId, URL]);

    return { teamInfo, load, er };
}

export default GetTeamHook
