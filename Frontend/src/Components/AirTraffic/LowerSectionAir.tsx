import React from 'react';
import './css/LowerSectionAir.css'
import { Airport } from './AirportsInfo';
import Notmas from './Notmas';
import Weather from './Weather';

interface LowerSectionAir{
  departureAirport: Airport;
  destinationAirport: Airport;
  weatherChange: boolean;
  isDepartureEx: boolean;
}

const LowerSectionAir: React.FC<LowerSectionAir> = ({
  departureAirport, 
  destinationAirport, 
  isDepartureEx,
  weatherChange}) => {

  return (
    <section className='LowerSectionAir'>
      <Weather 
        departureAirport={departureAirport} 
        destinationAirport={destinationAirport}
        weatherChange={weatherChange}
        isDepartureEx={isDepartureEx}
        />

      <Notmas 
      departureAirport={departureAirport} 
      destinationAirport={destinationAirport}
      weatherChange={weatherChange}
      isDepartureEx={isDepartureEx}/>
    </section>
  );
}

export default LowerSectionAir;