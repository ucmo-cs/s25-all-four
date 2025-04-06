import { useEffect, useState } from 'react';
import GetAllTeamsHook from './GetAllTeamsHook';
import { Team } from '../Components/Profile/NewTeam';
import { UserInformaion } from '../Components/Login/RegisterForm';

const GetTeamHook = (refreshTrigger: boolean) => {
  const storedUserId = localStorage.getItem('UserId') ?? '';

  const [teamInfo, setTeamInfo]   = useState<Team | null>(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);

  // all teams cached by a separate hook
  const { teamsInfo } = GetAllTeamsHook();

  useEffect(() => {
    // short‑circuit if we have no user
    if (!storedUserId) {
      setLoading(false);
      setTeamInfo(null);
      return;
    }

    // wait until teams list is ready
    if (!teamsInfo) return;

    const fetchData = async () => {
      setLoading(true);

      try {
        // 1. fetch user to know her current team
        const userResp = await fetch(
          `https://localhost:7010/api/UserInformation/${storedUserId}`
        );
        if (!userResp.ok) throw new Error('Cannot fetch user');

        const user: UserInformaion = await userResp.json();

        // 2. if user has no team → clear and finish
        if (!user.team) {
          setTeamInfo(null);
          return;
        }

        // 3. try to locate the team locally first
        const localTeam = teamsInfo.find(t => t.id === user.team);
        if (localTeam) {
          setTeamInfo(localTeam);
          return;
        }

        // 4. fallback: fetch the team by id
        const teamResp = await fetch(`https://localhost:7010/api/Team/${user.team}`);
        if (!teamResp.ok) throw new Error('Cannot fetch team');

        const remoteTeam: Team = await teamResp.json();
        setTeamInfo(remoteTeam);
      } catch (e: any) {
        console.error(e);
        setError(e.message ?? 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshTrigger, teamsInfo, storedUserId]);

  return { teamInfo, load: loading, er: error };
};

export default GetTeamHook;
