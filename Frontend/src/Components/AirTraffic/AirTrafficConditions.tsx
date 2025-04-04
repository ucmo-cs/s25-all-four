import React, { useEffect, useState } from 'react';
import './css/AirTrafficConditions.css'
import { Airport } from './AirportsInfo';

interface AirTrafficConditionsProps {
  setSelectedDepartureAirport: (airport: Airport) => void;
  setSelectedDestinationAirport: (airport: Airport) => void;
  setWeather: (any :boolean) => void;
  isDepartureEX: (any: boolean) => void;
  weather: boolean;
}

const AirTrafficConditions: React.FC<AirTrafficConditionsProps> = ({
  setSelectedDepartureAirport,
  setSelectedDestinationAirport,
  setWeather,
  isDepartureEX,
  weather
}) => {

  const [departureAirportCode, setDepartureAirportCode] = useState<string>('')
  const [destinationAirportCode, setDestinationAirportCode] = useState<string>('')

  async function CallAirport(isDeparture: boolean, code: string): Promise<void> {  
    if (code.trim() === '') return;    
    try {
      const url = `https://api.api-ninjas.com/v1/airports?iata=${code}`;
      const response = await fetch(url, {
        headers: {
          'X-Api-Key': 'AfauC+SiaJ04JjFEVLqYRg==JSDlxdwDKnzWMR1V'
        }
      });
  
      const airports: Airport[] = await response.json();
  
      if (isDeparture) {
        isDepartureEX(true);
        if (airports.length > 0) {
          setSelectedDepartureAirport(airports[0]);
        }
      } else {
        isDepartureEX(false);
        if (airports.length > 0) {
          setSelectedDestinationAirport(airports[0]);
        }
      }
  
      console.log(airports);
    } catch(e: any) {
      alert('There was a problem getting the airports: ' + e.message);
    } finally {
      setWeather(true);
      setTimeout(() => {
        setWeather(false);
      }, 100);
      setDepartureAirportCode('');
      setDestinationAirportCode('');
    }
  }
  

  useEffect(() => {
    console.log('Weather changed to: ' + weather);
  }, [weather]);

  return (
    <article className='AirTrafficConditions'>
        <h1>Air Traffic Conditions</h1>
        <label htmlFor="Departure">
            Please select your departure airport
            <div className='AirportInput'>
              <input type="text" 
                placeholder='Provide the airport'
                value={departureAirportCode}
                onChange={(e) => setDepartureAirportCode(e.target.value)}
                />
              <button onClick={() => CallAirport(true, departureAirportCode)}>Search</button>
            </div>
        </label>
        <label htmlFor="Destination">
            Please select your destination airport
            <div className='AirportInput'>
              <input type="text" 
                placeholder='Provide the airport'
                value={destinationAirportCode}
                onChange={(e) => setDestinationAirportCode(e.target.value)}
                />
              <button onClick={() => CallAirport(false, destinationAirportCode)}>Search</button>
            </div>
        </label>

          <button>Press Here to see in the map</button>
    </article>
  );
}

export default AirTrafficConditions;