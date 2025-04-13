import React, { useEffect, useState } from 'react';
import { Project } from '../Components/Profile/NewProject';
import GetUserHook from '../Shared/GetUserHook';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Shared/NavBar';

interface ProjectProp {
  ProjectInformation: Project;
}

const ProjectnfoPage: React.FC<ProjectProp> = ({ ProjectInformation }) => {
  const navigate = useNavigate();
  const { userInfo } = GetUserHook(false);  // Removed changeUser parameter
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (userInfo) {
      const isSameTeam = userInfo.team === ProjectInformation.teamID;
      setIsValid(isSameTeam);
      console.log(isSameTeam ? "This is valid" : "This is not valid");
      console.log(`${userInfo.username} User`);
      console.log(`${ProjectInformation.teamID} Project`);
      
      if (!isSameTeam) {
        setTimeout(() => {
          navigate('/application');          
        }, 300);
      }
    }
  }, [userInfo, ProjectInformation, navigate]);

  return (
    <>
      {!isValid ? (
        <main>
          <h1>This is not valid</h1>
        </main>
      ) : (
        <main className="ProjectnfoPage">
          {/* <NavBar/> */}
          <section>
            <h1>{ProjectInformation.name}</h1>
            <h3>Created by: {ProjectInformation.creatorID}</h3>
            <h3>{ProjectInformation.description}</h3>
          </section>
        </main>
      )}
    </>
  );
};

export default ProjectnfoPage;
