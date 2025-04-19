import React from 'react';
import './css/OurMission.css'

const OurMission: React.FC = () => {

  return (    
  <section className='OurMission' >
    <div className='OurMissionContainer'>
      <h1 >Our Mission</h1>
      <p>
        Our mission is to empower aviation teams with a robust, user-friendly platform that enhances collaboration, streamlines task management, 
        and provides real-time access to essential flight information. 
      </p>
      <p>
        We strive to be the go-to solution for aviation professionals seeking to 
        optimize their workflows, improve communication, and stay informed with the latest flight data.
      </p>
      <img src="https://www.boeing.com/content/theboeingcompany/us/en/_jcr_content/root/container/image_copy.coreimg.85.1600.jpeg/1702249787634/home-roadblock-people.jpeg" 
          alt="People img" />            
      <h1>Who we are</h1>
      <p>
      At my project, we are revolutionizing the way aviation professionals collaborate and access real-time flight information. Founded in [Year], 
      our platform serves as a centralized hub where 
      </p>
      <p>
      effective communication meets cutting-edge aviation technology, empowering teams to achieve unprecedented
      levels of efficiency and connectivity.
      </p>
    </div>
  </section>
  );
}

export default OurMission;