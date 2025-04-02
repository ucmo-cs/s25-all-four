import React from 'react';
import './css/LowerSectionAir.css'
import { Airport } from './AirportsInfo';
import Notmas from './Notmas';
import Weather from './Weather';

interface LowerSectionAir{
  departureAirport: Airport;
  destinationAirport: Airport;
  weatherChange: boolean;
}

const LowerSectionAir: React.FC<LowerSectionAir> = ({departureAirport, destinationAirport, weatherChange}) => {
  return (
    <section className='LowerSectionAir'>
      <Weather 
        departureAirport={departureAirport} 
        destinationAirport={destinationAirport}
        weatherChange={weatherChange}
        />

      <Notmas 
      departureAirport={departureAirport} 
      destinationAirport={destinationAirport}/>
    </section>
  );
}

export default LowerSectionAir;