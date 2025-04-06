import React from 'react';
import { IModifyMore } from './AllInformation';

const AllInfoTop: React.FC<IModifyMore> = ({
    modify, 
    birthday, 
    nickName, 
    information,
    userInfo, 
    loading,
    setBirthday, 
    setNickName, 
    setInformation}) => {

  return (
    <section className='InformationsContainer'>
        <article className='InformationArticle'>
            <h2>More information</h2>
            <div className='InformationItemContainer'>
            <div className='InformationItem'>
                <p style={{backgroundColor: '#D9001B', color: 'white', height: '70%', width: '35%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.5em'}}>
                Birthday
                </p>
                <p style={{marginLeft: '2vw'}}>
                    {
                    modify === true 
                    ? <input type="date" className='BirthdayInput' value={birthday} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBirthday(e.target.value)} /> 
                    : (userInfo?.birthday?.toString() === '' ) || (userInfo?.birthday === null ) ? <p>No birthday provided</p> : <p>
                        {
                        loading === true ? 'loading' : userInfo?.birthday?.toString().substring(0,10)
                        }
                    </p>
                    }
                </p>
            </div>
            <div className='InformationItem'>
            <p style={{backgroundColor: '#D9001B', color: 'white', height: '70%', width: '35%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.5em'}}>
                Position
            </p>
                <p style={{marginLeft: '2vw'}}>
                {
                    loading === true ? <p>Loading...</p> : userInfo?.position
                }
                </p>
            </div>
            <div className='InformationItem'>
            <p style={{backgroundColor: '#D9001B', color: 'white', height: '70%', width: '35%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.5em'}}>
                NickName
            </p>
                {
                    modify === true 
                    ? <input type="text"  className='BirthdayInput' value={nickName} onChange={(e) => setNickName(e.target.value)} style={{marginLeft: '2vw'}} placeholder='Add your nickname' />  
                    : (userInfo?.nickName === '' ) || (userInfo?.nickName === null ) ? <p style={{marginLeft: '2vw'}}>No nickname provided</p> : <p style={{marginLeft: '2vw'}}>
                    {loading === true ? 'Loading...' : userInfo?.nickName }
                    </p>
                }
            </div>
            </div>
        </article>
    <div className='InformationText'>
        <div className='InformationTextContainer'>
            <div className='InformationTextHeader'>
                <h3>information</h3>
            </div>
            <div className='InformationTextInfo'>
                {
                    modify === true ? <textarea placeholder='Write your information here...' rows={4}  value={information} onChange={(e) => setInformation(e.target.value)}/> :
                    (userInfo?.information === '' ) || (userInfo?.information === null ) ? <p>No information provided</p> : <p>{userInfo?.information}</p>
                }
            </div>

        </div>
    </div>
    </section>
  );
}

export default AllInfoTop;