import { useEffect, useState } from "react";
import { UserInformaion } from "../Components/Login/RegisterForm"; 

const useGetUser = () => {

  const storedUserId = localStorage.getItem('UserId') ?? "";  
  const [userInfo, setUserInfo] = useState<UserInformaion | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!storedUserId) {
      setLoading(false);
      return;
    }
    const url = `https://localhost:7010/api/UserInformation/${storedUserId}`;

    const fetchUser = async () => {
      try {
        const response = await fetch(url);
        const text = await response.text();

        if (!text) {
          console.warn("Empty response received from the server.");
          setUserInfo(null);
        } else {          
          const data: UserInformaion = JSON.parse(text);
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
  return { userInfo, loading, error };
};

export default useGetUser;
