import React, { useState } from 'react';
import './css/AirTrafficMenu.css'
import UpperSectionAir from './UpperSectionAir';
import LowerSectionAir from './LowerSectionAir';
import { Airport } from './AirportsInfo';

const AirTrafficMenu: React.FC = () => {

  const [departureAirport, setDepartureAirport] = useState<Airport>(
    {icao: '', 
    iata: '', 
    name: '', 
    city: '', 
    region: '', 
    country: '', 
    elevation_ft: 0, 
    latitude: 0, 
    longitude: 0, 
    timezone: ''})
  const [destinationAirport, setDestinationAirport] = useState<Airport>({
    icao: '', 
    iata: '', 
    name: '', 
    city: '', 
    region: '', 
    country: '', 
    elevation_ft: 0, 
    latitude: 0, 
    longitude: 0, 
    timezone: ''})

    const [loadingWeather, setLoadingWeather] = useState<boolean>(false);

  return (
    <section className='AirTrafficMenu'>
         <UpperSectionAir 
         setDepartureAirport={setDepartureAirport} 
         setDestinationAirport={setDestinationAirport} 
         departureAirport={departureAirport} 
         destinationAirport={destinationAirport}
         changeweather={setLoadingWeather}
         weather={loadingWeather}
         />
         <LowerSectionAir 
         destinationAirport={destinationAirport} 
         departureAirport={departureAirport}
         weatherChange={loadingWeather}
         />
         <div className='CopyRights' style={{height: '5%'}}>
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

export default AirTrafficMenu;