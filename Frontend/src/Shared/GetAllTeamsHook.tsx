import { useEffect, useState } from 'react'
import { Team } from '../Components/Profile/NewTeam';

const GetAllTeamsHook = () => {
   const storedUserId = localStorage.getItem('UserId') ?? "";  
    const [teamsInfo, setUserInfo] = useState<Team[] | null>(null);
    const [load, setLoading] = useState<boolean>(true);
    const [er, setError] = useState<string | null>(null);
  
    useEffect(() => {
      if (!storedUserId) {
        setLoading(false);
        return;
      }
      const url = `https://localhost:7010/api/Team`;
  
      const fetchUser = async () => {
        try {
          const response = await fetch(url);
          const text = await response.text();
  
          if (!text) {
            console.warn("Empty response received from the server.");
            setUserInfo(null);
          } else {          
            const data: Team[] = JSON.parse(text);
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
    return { teamsInfo, load, er };
}

export default GetAllTeamsHook