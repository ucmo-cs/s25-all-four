import React, { useEffect, useRef, useState } from 'react';
import './css/TimeSheetMenu.css'
import GetUserHook from '../../Shared/GetUserHook'
import GetAllUsersHook from '../../Shared/GetAllUsersHook';
import GetTeamHook from '../../Shared/GetTeamHook';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// import { Team } from '../Profile/NewTeam';

interface ITimeSheet{
  id?: string;
  userName: string;
  month: string;
  userId: string;
}
interface ITimeEntry{
  id?: string;
  day: number;
  hoursWorked: number;
  month: string;
  userId: string;
}

const TimeSheetMenu: React.FC = () => {
  
  const {userInfo} = GetUserHook(false);
  const [month, setMonth] = useState<string>('January');
  const [monthId, setMonthId] = useState<number>(0);
  const {usersInfo, load} = GetAllUsersHook();
  const {teamInfo} = GetTeamHook(false)
  const [editUser, setEditUser] = useState<string>(localStorage.getItem('UserId')?? "")
  const [timeEntries, setTimeEntries] = useState<{[key: number]: number}>({})
  const [timeEntry, setTimeEntry] = useState<ITimeEntry[]>([])
  const [isEditable, setIsEditable] = useState<boolean>(false)  
  const [timeSheet, setTimeSheet] = useState<ITimeSheet[]>([])
  const printRef = useRef<HTMLDivElement>(null)
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

  useEffect(()=>{
    console.log(GetTimeEntries())
  },[])

  //Assign the month id to the month selected
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
  async function GetTimeEntries(): Promise<void> {
    const url: string = 'https://localhost:7010/api/TimeEntry'    
    try{
      const response = await fetch(url)
      const data: ITimeEntry[] = await response.json() 
      setTimeEntry(data)     
    }catch(e){
      alert(e)
    }
  }

  async function SubmitTimeEntries(): Promise<void> {
    var url: string = 'https://localhost:7010/api/TimeEntry'    
    var localMethod: string = 'POST';
    await GetTimeEntries()
    
    Object.keys(timeEntries).forEach(async (key) => {
      var ftimeEntries = timeEntry.find(te => te.userId === editUser && te.month === month && te.day === Number(key))    
      const timeEntryId = ftimeEntries?.id ?? ""
      if(ftimeEntries) {
        url = `https://localhost:7010/api/TimeEntry/${timeEntryId}`
        localMethod = 'PUT'
      }else{
        url = 'https://localhost:7010/api/TimeEntry'
        localMethod = 'POST'
      }

      try{
            await fetch(url, {
            method: localMethod,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              day: Number(key),
              hoursWorked: timeEntries[Number(key)],
              month: month,
              userId: editUser
            })
            })
      }catch(e){
        alert(e)
      }finally{
        alert(`Your ${key} hour/s on ${month}, ${timeEntries[Number(key)]} has been saved`)
        setIsEditable(false)
        await GetTimeEntries()
        setTimeEntries({});``
      }
    })
  }  
  function HandleChanges(id: number, value: number): void {
    if(value > 8){
      alert('You cannot work more than 8 hours a day')
      return
    }
    if(typeof(value) !== 'number'){
      alert('Please enter a number')
      return
    }
    setTimeEntries((prev) => ({
      ...prev,
      [id + 1]: value
    }));
  }
  async function CheckToPost(): Promise<void> {    
    await GetTimeSheet();
    if(timeSheet.length === 0) {
      await PostNewTimeSheet();       
      await GetTimeSheet();
    }
    console.log(timeSheet);
  }
  async function PostNewTimeSheet(): Promise<void> {
    const url: string = 'https://localhost:7010/api/TimeSheet'    
    try{
        await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userName: usersInfo?.find(u => u.id === editUser)?.username,
            month: month,
            userId: editUser
          })
        })
    }catch(e){
      alert(e)
    }finally{
      await GetTimeEntries()
    }
  }
  async function GetTimeSheet(): Promise<void> {
    const url: string = 'https://localhost:7010/api/TimeSheet'
    try{
      const response = await fetch(url)
      const data: ITimeSheet[] = await response.json()
      if(data !== null) setTimeSheet(data)        
    }catch(e){
      alert(e)
    }
  }  
  const HandleDownloadPDF = async (): Promise<void> => {
    const target = printRef.current as HTMLDivElement;
    if(!target) return;
    const canvas = await html2canvas(target)
    const data = canvas.toDataURL('image/png')

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: 'letter'
    })

    const pageWidth = pdf.internal.pageSize.getWidth();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
    pdf.addImage(data, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('TimeSheet.pdf');
  }

  return (
    <section className='TimeSheetMenu' ref={printRef}>
      <div className='Time'>

      <div className='TSContainer'>
        <h1>TimeSheet</h1>
        <article className='TSMenu'>
          {
            userInfo?.position === 'admin' ? (
              <div className='AdminTSOptions'>
                <div className='SelectTS'>
                  <h4>Select user</h4>
                  <select name="" id="" value={editUser} onChange={(e) => {setEditUser(e.target.value); setIsEditable(false)}}>
                    <option value="">No user selected</option>
                    {
                      usersInfo?.filter((t) => t.team === teamInfo?.id).map((user, index) =>(
                        <option value={user.id} key={index}>{user.username.substring(0,30)}</option>
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
                    <button onClick={HandleDownloadPDF}>Export PDF</button>
                    <button onClick={() => {setIsEditable(!isEditable); CheckToPost();}}>{isEditable === true ? 'Stop editing' : 'Edit'}</button>
                    {
                      isEditable === true && <button onClick={SubmitTimeEntries}>Save</button>             
                    } 
                </div>
              </div>
            ) : (<div className='AdminTSOptions'>
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
                    <button onClick={HandleDownloadPDF}>Export PDF</button>
                    <button onClick={() => {setIsEditable(!isEditable); CheckToPost();}}>{isEditable === true ? 'Stop editing' : 'Edit'}</button>
                    {
                      isEditable === true && <button onClick={SubmitTimeEntries}>Save</button>             
                    } 
                </div>
            </div>)
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
              <div className='MemebersTimes'>
              {
                teamInfo === null ? <p>No team selected</p> :
                load === true ? <p>Loading users</p> :
                usersInfo?.filter(u => u.team === teamInfo?.id).map((member, index)=>(
                  <div className='BCTMTS'>
                    <div className='TeamMemberTS' key={index}><p className='TeamMemberTSName'>{member.username.substring(0,40)}</p></div>
                    <div className='DaysOfMember'>
                      {/* This is where the hours worked are displayed */}
                    {
                      Array.from({ length: calendarMonths[monthId].days }).map((_, index) => (
                        <div className='DaysofMonth' key={index}>
                        {
                          (isEditable === true && member.id === editUser) 
                          ? 
                          <input key={index} type="number" className='noarrows' placeholder='#' value={timeEntries[index + 1]} onChange={(e) => HandleChanges(index, Number(e.target.value))}/> 
                          :  
                          <p key={index}>                            
                            {
                              timeEntry.find(te => te.day === index + 1 && te.userId === member.id && te.month === month)?.hoursWorked ?? <b style={{fontFamily: 'monospace'}}>0</b>                              
                                // .map((te, i) => (
                                //   <span key={i}>{te.hoursWorked}</span>
                                // ))
                            }
                          </p>
                        }
                        </div>
                        
                      ))
                    }   
                    </div>
                  </div>
                ))
              }
              </div>
            </div>
          </div>
        </article>
        <div className='SubmitTime'>

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