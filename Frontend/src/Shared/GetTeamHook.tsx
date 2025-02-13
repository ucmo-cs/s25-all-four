import React, { useEffect, useState } from 'react'
import { Team } from '../Components/Profile/NewTeam';
import GetUserHook from './GetUserHook';
import GetAllTeamsHook from './GetAllTeamsHook';

const GetTeamHook = () => {

   const storedUserId = localStorage.getItem('UserId') ?? "";  
    const [teamInfo, setUserInfo] = useState<Team | null>(null);
    const [load, setLoading] = useState<boolean>(true);
    const [er, setError] = useState<string | null>(null);
    const {userInfo} =GetUserHook();
    const {teamsInfo} = GetAllTeamsHook()

    useEffect(() => {

        const getTeam = teamsInfo?.find(t => t.id === userInfo?.team);
        const URL: string = `https://localhost:7010/api/Team/${getTeam?.id}`
        
      if (!storedUserId) {
        setLoading(false);
        return;
      }  
      const fetchUser = async () => {
        try {
          const response = await fetch(URL);
          const text = await response.text();
  
          if (!text) {
            console.warn("Empty response received from the server.");
            setUserInfo(null);
          } else {          
            const data: Team = JSON.parse(text);
            setUserInfo(data);
          }        
  
        } catch (err: any) {
          
          console.error("Failed to fetch team info:", err);
          setError(err.message || "Unknown error");
  
        } finally {
          setLoading(false);
        }
      };
  
      fetchUser();
    }, [storedUserId]);
    return { teamInfo, load, er };
}

export default GetTeamHook