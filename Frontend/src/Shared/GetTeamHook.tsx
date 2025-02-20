import { useEffect, useState } from "react";
import { Team } from "../Components/Profile/NewTeam";
import GetAllTeamsHook from "./GetAllTeamsHook";
import { UserInformaion } from "../Components/Login/RegisterForm";

const GetTeamHook = () => {
  const storedUserId = localStorage.getItem("UserId") ?? "";
  const [teamInfo, setTeamInfo] = useState<Team | null>(null);
  const [load, setLoading] = useState<boolean>(true);
  const [er, setError] = useState<string | null>(null);

  const { teamsInfo } = GetAllTeamsHook();

  useEffect(() => {
    // 1. If no user ID in localStorage, skip loading (no need to fetch).
    if (!storedUserId) {
      setLoading(false);
      return;
    }

    // 2. If teamsInfo isn't loaded yet or is an empty array, wait until it's available.
    if (!teamsInfo || teamsInfo.length === 0) {
      return;
    }

    const fetchTeamInfo = async () => {
      try {
        // 3. Fetch user info from the server (to get the user's team ID).
        const userResponse = await fetch(
          `https://localhost:7010/api/UserInformation/${storedUserId}`
        );
        if (!userResponse.ok) {
          throw new Error(
            `Failed to fetch user info: ${userResponse.status} ${userResponse.statusText}`
          );
        }

        const userData: UserInformaion = await userResponse.json();

        // 4. Find the matching team object from the list of teams.
        const userTeam = teamsInfo.find((t) => t.id === userData.team);
        if (!userTeam) {
          console.warn("No matching team found for this user's team ID.");
          setTeamInfo(null);
          return;
        }

        // 5. Fetch the actual team details using the found team's ID.
        const teamResponse = await fetch(
          `https://localhost:7010/api/Team/${userTeam.id}`
        );
        if (!teamResponse.ok) {
          throw new Error(
            `Failed to fetch team info: ${teamResponse.status} ${teamResponse.statusText}`
          );
        }

        // 6. Handle empty response or parse the JSON data.
        const text = await teamResponse.text();
        if (!text) {
          console.warn("Empty response for the team info.");
          setTeamInfo(null);
        } else {
          const data: Team = JSON.parse(text);
          setTeamInfo(data);
        }
      } catch (error: any) {
        console.error("Failed to fetch team info:", error);
        setError(error.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamInfo();
  }, [storedUserId, teamsInfo]);

  return { teamInfo, load, er };
};

export default GetTeamHook;
