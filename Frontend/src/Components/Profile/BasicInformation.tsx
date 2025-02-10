import React from 'react';
import './css/BasicInformation.css'

const BasicInformation: React.FC = () => {
  return (
    <section className='BasicInformation'>
        <article className='BasicInformationContainer'>
            <div className='ProfileImg'>
                <img src="https://www.svgrepo.com/show/486506/user-profile-filled.svg" 
                    alt="prfile img" />
            </div>
            <div className='Name_Email_Phone'>
                <h2>Current name</h2>
                <div className='informationItem'>
                    <p>No email provided</p>
                    <div className='InformationItemConfig'>
                        <img src="https://www.svgrepo.com/show/509920/eye.svg" 
                            alt="visible" />                        
                        {/* <img src="https://www.svgrepo.com/show/509919/eye-off.svg" 
                            alt="not visible" /> */}
                    </div>
                </div>
                <div className='informationItem'>
                    <p>No phone number provided</p>
                    <div className='InformationItemConfig'>
                        <img src="https://www.svgrepo.com/show/509920/eye.svg" 
                            alt="visible" />                        
                        {/* <img src="https://www.svgrepo.com/show/509919/eye-off.svg" 
                            alt="not visible" /> */}
                    </div>
                </div>
                <div className='informationItem'>
                    <p>No address provided</p>
                    <div className='InformationItemConfig'>
                        <img src="https://www.svgrepo.com/show/509920/eye.svg" 
                            alt="visible" />                        
                        {/* <img src="https://www.svgrepo.com/show/509919/eye-off.svg" 
                            alt="not visible" /> */}
                    </div>
                </div>
            </div>
            <div className='Edit_Delete'>
                <img src="https://www.svgrepo.com/show/511904/edit-1479.svg" 
                     alt="edit" />       
                <img src="https://www.svgrepo.com/show/522316/trash.svg" 
                     alt="delete" />       
            </div>
        </article>
    </section>
  );
}

export default BasicInformation;