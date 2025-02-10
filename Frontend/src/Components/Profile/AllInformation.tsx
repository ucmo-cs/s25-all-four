import React from 'react';
import './css/AllInformation.css'

const AllInformation: React.FC = () => {
  return (
    <section className='AllInformation'>
         <div className='AllInformationContainer'>
            <div className='AllinformationInputs'>
                <hr/>
                <div className='MoreInformation'>
                    <h2>More information</h2>
                    <div className='InformationItem'>
                        <p style={{backgroundColor: '#D9001B', color: 'white', height: '70%', width: '35%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.5em'}}>Birthday</p>
                        <p style={{marginLeft: '2vw'}}>Not provided</p>
                    </div>
                    <div className='InformationItem'>
                    <p style={{backgroundColor: '#D9001B', color: 'white', height: '70%', width: '35%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.5em'}}>Birthday</p>
                        <p style={{marginLeft: '2vw'}}>Not provided</p>
                    </div>
                    <div className='InformationItem'>
                    <p style={{backgroundColor: '#D9001B', color: 'white', height: '70%', width: '35%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.5em'}}>Birthday</p>
                        <p style={{marginLeft: '2vw'}}>Not provided</p>
                    </div>
                </div>
                <hr/>
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

export default AllInformation;