import { useEffect, useState } from "react";
import { UserInformaion } from "../Components/Login/RegisterForm"; 

const GetAllUsersHook = () => {

  const storedUserId = localStorage.getItem('UserId') ?? "";  
  const [usersInfo, setUserInfo] = useState<UserInformaion[] | null>(null);
  const [load, setLoading] = useState<boolean>(true);
  const [er, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!storedUserId) {
      setLoading(false);
      return;
    }
    const url = `https://localhost:7010/api/UserInformation/`;

    const fetchUser = async () => {
      try {
        const response = await fetch(url);
        const text = await response.text();

        if (!text) {
          console.warn("Empty response received from the server.");
          setUserInfo(null);
        } else {          
          const data: UserInformaion[] = JSON.parse(text);
          setUserInfo(data);
        }        

      } catch (err: any) {
        
        console.error("Failed to fetch user info:", err);
        setError(err.message || "Unknown error");

      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [storedUserId]);
  return { usersInfo, load, er };
};

export default GetAllUsersHook;
