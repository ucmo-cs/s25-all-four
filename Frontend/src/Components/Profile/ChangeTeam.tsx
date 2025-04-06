import React, { useEffect } from 'react';
import { UserInformaion } from '../Login/RegisterForm';
import { Team } from './NewTeam';

interface IChangeTeamProps {  
  usersInfo: UserInformaion[] | null;
  teamsInfo: Team[] | null;
  teamInfo: Team | null;
  load: boolean;
  teamIndex: number;
  setTeamIndex: (value: number | ((prev: number) => number)) => void;
  SelectTeam: (teamID_: string | null, join: boolean) => Promise<void>;
}

const ChangeTeam: React.FC<IChangeTeamProps> = ({
  usersInfo,
  teamsInfo,
  teamInfo,
  load,
  teamIndex,
  setTeamIndex,
  SelectTeam,
}) => {
  
  useEffect(() => {
    if (teamInfo && teamsInfo) {
      const idx = teamsInfo.findIndex(t => t.id === teamInfo.id);
      if (idx !== -1 && idx !== teamIndex) setTeamIndex(idx);
    }  
  }, [teamInfo, teamsInfo]);

  const hasTeam = !!teamInfo; 
  const currentTeam = teamsInfo?.[teamIndex];

  return (
    <article className='ProjectSelection'>
      <p className='PCTP'>{hasTeam ? 'Current team project' : ''}</p>
      <h2>
        {hasTeam
          ? load
            ? 'Loading...'
            : teamInfo?.teamName?.substring(0, 27)
          : 'Choose a team'}
      </h2>

      <div className='SelectionBody'>
        <img
          src='https://www.svgrepo.com/show/247760/left-arrow-back.svg'
          alt='previous team'
          onClick={() => setTeamIndex((prev: number) => Math.max(prev - 1, 0))}
        />

        <div>
          {currentTeam ? (
            <>
              <h4>{currentTeam.teamName.substring(0, 25)}</h4>
              <p>{currentTeam.teamDescription}</p>
              <p>Size of team: {currentTeam.teamSize}</p>
              <p>
                Current size of team:{' '}
                {usersInfo?.filter(u => u.team === currentTeam.id).length ?? 0}
              </p>
            </>
          ) : (
            <p>No team</p>
          )}
        </div>

        <img
          style={{ transform: 'rotateZ(180deg)' }}
          src='https://www.svgrepo.com/show/247760/left-arrow-back.svg'
          alt='next team'
          onClick={() =>
            setTeamIndex(prev =>
              teamsInfo ? Math.min(prev + 1, teamsInfo.length - 1) : 0
            )
          }
        />
      </div>

      <div className='ButtonsTeam'>
        {!hasTeam && (
          <button onClick={() => SelectTeam(currentTeam?.id ?? null, true)}>
            Join
          </button>
        )}
        {hasTeam && <button onClick={() => SelectTeam(null, false)} style={{backgroundColor: 'red'}}>Leave team</button>}
      </div>
    </article>
  );
};

export default ChangeTeam;