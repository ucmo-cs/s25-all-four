import React from 'react';
import './css/FindUsers.css'

const FindUsers: React.FC = () => {
  return (
    <section className='FindUsers'>
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
              <div className='UserItem'>
                <img src="https://www.svgrepo.com/show/486506/user-profile-filled.svg" 
                      alt="" />
                <h1>Username</h1>
                <p>Team: no team</p>
                <button>Add user</button>
              </div>              
              <div className='UserItem'>
                <img src="https://www.svgrepo.com/show/486506/user-profile-filled.svg" 
                      alt="" />
                <h1>Username</h1>
                <p>Team: no team</p>
                <button>Add user</button>
              </div>              
              <div className='UserItem'>
                <h1>Sorry</h1>
                <p>But it looks like no more users has created a account yes</p>
              </div>              

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