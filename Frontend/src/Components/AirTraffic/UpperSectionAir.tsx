import React, { useState } from 'react';
import './css/UpperSectionAir.css'
import AirTrafficConditions from './AirTrafficConditions';
import AirportsInfo, { Airport } from './AirportsInfo';

const UpperSectionAir: React.FC = () => {

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

  return (
    <section className='UpperSectionAir'>
      <AirTrafficConditions setSelectedDepartureAirport={setDepartureAirport} setSelectedDestinationAirport={setDestinationAirport}/>
      <AirportsInfo departureAirport={departureAirport} destinationAirport={destinationAirport}/>
    </section>
  );
}

export default UpperSectionAir;