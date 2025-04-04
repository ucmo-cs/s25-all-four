import React from 'react';
import './css/UpperSectionAir.css'
import AirTrafficConditions from './AirTrafficConditions';
import AirportsInfo, { Airport } from './AirportsInfo';

interface UpperSectionAirProps {
  setDepartureAirport: (airport: Airport) => void;
  setDestinationAirport: (airport: Airport) => void;
  departureAirport: Airport;
  destinationAirport: Airport;
  changeweather: (any: boolean) => void;
  isDeparture: (any: boolean) => void;
  weather: boolean;
}
const UpperSectionAir: React.FC<UpperSectionAirProps> = ({
  setDepartureAirport,
  setDestinationAirport,
  departureAirport,
  destinationAirport,
  changeweather,
  isDeparture,
  weather
}) => {

  return (
    <section className='UpperSectionAir'>
      <AirTrafficConditions 
        setSelectedDepartureAirport={setDepartureAirport} 
        setSelectedDestinationAirport={setDestinationAirport} 
        setWeather={changeweather}
        isDepartureEX={isDeparture}
        weather={weather}/>
        
      <AirportsInfo 
        departureAirport={departureAirport} 
        destinationAirport={destinationAirport}/>
    </section>
  );
}

export default UpperSectionAir;