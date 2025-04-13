import React from 'react';
import './css/UpperSectionAir.css'
import AirTrafficConditions from './AirTrafficConditions';
import AirportsInfo, { Airport } from './AirportsInfo';

interface UpperSectionAirProps {
  DepartureAirport: Airport;
  DestinationAirport: Airport;
  setDepartureAirport: (airport: Airport) => void;
  setDestinationAirport: (airport: Airport) => void;
  departureAirport: Airport;
  destinationAirport: Airport;
  changeweather: (any: boolean) => void;
  isDeparture: (any: boolean) => void;
  closeMap: boolean;
  setCloseMap: (value: boolean) => void;
}
const UpperSectionAir: React.FC<UpperSectionAirProps> = ({
  setDepartureAirport,
  setDestinationAirport,
  departureAirport,
  destinationAirport,
  changeweather,
  isDeparture,
  closeMap,
  setCloseMap
}) => {

  return (
    <section className='UpperSectionAir'>
      <AirTrafficConditions 
        setSelectedDepartureAirport={setDepartureAirport} 
        setSelectedDestinationAirport={setDestinationAirport} 
        setWeather={changeweather}
        isDepartureEX={isDeparture}
        closeMap={closeMap}
        setCloseMap={setCloseMap}
        DestinationAirport={destinationAirport}
        DepartureAirport={departureAirport}
        />        
      <AirportsInfo 
        departureAirport={departureAirport} 
        destinationAirport={destinationAirport}/>
    </section>
  );
}

export default UpperSectionAir;