import React, { useEffect, useState } from 'react';
import './css/TimeSheetMenu.css'
import GetUserHook from '../../Shared/GetUserHook'
import GetAllUsersHook from '../../Shared/GetAllUsersHook';

const TimeSheetMenu: React.FC = () => {

  const {userInfo, loading, error} = GetUserHook();
  const [month, setMonth] = useState<string>('June');
  const [monthId, setMonthId] = useState<number>(0);
  const {usersInfo, load, er} = GetAllUsersHook();

  const calendarMonths = [
    { "id": 1, "name": "January", "days": 31 },
    { "id": 2, "name": "February", "days": 28 },
    { "id": 3, "name": "March", "days": 31 },
    { "id": 4, "name": "April", "days": 30 },
    { "id": 5, "name": "May", "days": 31 },
    { "id": 6, "name": "June", "days": 30 },
    { "id": 7, "name": "July", "days": 31 },
    { "id": 8, "name": "August", "days": 31 },
    { "id": 9, "name": "September", "days": 30 },
    { "id": 10, "name": "October", "days": 31 },
    { "id": 11, "name": "November", "days": 30 },
    { "id": 12, "name": "December", "days": 31 }
  ]
  
  useEffect(() =>{
    const AssignMonthId = () =>{
      for (let index = 0; index < calendarMonths.length; index++) {
        if(month === calendarMonths[index].name){
          setMonthId(index)
        }
      }
    }
    AssignMonthId();
  },[month])
  return (
    <section className='TimeSheetMenu'>
      <div className='Time'>

      <div className='TSContainer'>
        <h1>TimeSheet</h1>
        <article className='TSMenu'>
          {
            userInfo?.position === 'admin' ? (
              <div className='AdminTSOptions'>
                <div className='SelectTS'>
                  <h4>Select user</h4>
                  <select name="" id="">
                    <option value="">No user selected</option>
                    {
                      usersInfo?.map((user, index) =>(
                        <option value="">{user.username}</option>
                      ))
                    }
                  </select>
                </div>
                <div className='SelectTS'>
                  <h4>Select month</h4>
                  <select name="" id="" onChange={(e) => setMonth(e.target.value)}>
                  {                        
                    calendarMonths.map((month, index) => (
                      <option key={index} value={month.name}>
                        {month.name}
                      </option>
                    ))                       
                  }
                  </select>
                </div>
                <div className='ExportEditSave'>
                    <button>Export PDF</button>
                    <button>Save</button>
                    <button>Edit</button>
                </div>
              </div>
            ) : (<div className='AdminTSOptions'></div>)
          }
          <div className='CalendarTSContainer'>
            <h1>{month}</h1>
            <div className='CalendarTS'>
              <div className='DaysofMonthContainer'>
                  <div className='DaysofMonth' style={{minWidth: '10%'}}>
                    Days
                  </div>                  
                  {
                    Array.from({ length: calendarMonths[monthId].days }).map((_, index) => (
                      <div className='DaysofMonth' key={index}>{index + 1}</div>
                    ))
                  }
              </div>
            </div>
          </div>
        </article>
        <div className='SubmitTime'>
          <input type="text" placeholder='Signature'/>
          <button>Submit</button>
        </div>
      </div>

      <div className='CopyRights' style={{height: '12%'}}>
      <p>© 2025 Pablo Panchig. All Rights Reserved.</p>
      <p>This website was designed and developed by Pablo Panchig, 
        a student at the University of Central Missouri. Unauthorized 
        use or duplication of content is strictly prohibited without 
        prior written consent. For inquiries or permissions, please 
        contact <a href="https://itspablopanchig.me">Pablo Panchig</a>
      </p>
      <hr />
      </div>

      </div>
    </section>
  );
}

export default TimeSheetMenu;