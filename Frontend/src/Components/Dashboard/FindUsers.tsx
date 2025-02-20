import React from 'react';
import './css/FindUsers.css'
import GetAllUsersHook from '../../Shared/GetAllUsersHook';
import GetUserHook from '../../Shared/GetUserHook';
import GetAllTeamsHook from '../../Shared/GetAllTeamsHook';
import { Element } from 'react-scroll';
const FindUsers: React.FC = () => {

  const {usersInfo, load, er} = GetAllUsersHook();
  const {teamsInfo} = GetAllTeamsHook();
  const userinfo = GetUserHook()
  
  return (
    <section className='FindUsers'>
      <Element name='ScrollFind'></Element>
        <div className='FindUsersContainer'>
          <div className='FindUsersHeader'>
            <div className='SearchbarFriends'>
              <h1>Find people</h1>
              <input type="text" />
              <img src="https://www.svgrepo.com/show/506743/search-square.svg" 
              alt="search img" />
            </div>
          </div>
          <div className='User_Friends'>
          {
              (usersInfo || []).length <= 1 && (
              <div className='UserItem'>
                <h1>Sorry</h1>
                <p>But it looks like no more users has created a account yes</p>
              </div>     
            )
          }
          {
            ((usersInfo || []).length)  > 1 && (usersInfo?.find(user => user.id === userinfo.userInfo?.id))  && (
              usersInfo.filter((u) => u.id !== userinfo.userInfo?.id).map((user, index) => (
                <div key={index} className='UserItem'>
                  <img 
                    src="https://www.svgrepo.com/show/486506/user-profile-filled.svg" 
                    alt="" 
                  />
                  <h1>{user.username}</h1>
                  <p>
                    {
                      (user.team === null) || (user.team === '') ?
                      'No team' :
                      teamsInfo?.find(t => t.id === user.team)?.teamName
                    }
                  </p>
                  <button>Add user</button>
                </div>
              ))
            )
          } 
          </div>
        </div>
        <div className='CopyRights'>
          <p>© 2025 Pablo Panchig. All Rights Reserved.</p>
          <p>This website was designed and developed by Pablo Panchig, 
            a student at the University of Central Missouri. Unauthorized 
            use or duplication of content is strictly prohibited without 
            prior written consent. For inquiries or permissions, please 
            contact <a href="https://itspablopanchig.me">Pablo Panchig</a>
          </p>
          <hr />
        </div>
    </section>
  );
}

export default FindUsers;