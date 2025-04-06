import React, { useEffect, useState } from 'react';
import './css/Weather.css';
import WeatherBox from './WeatherBox';
import { Airport } from './AirportsInfo';
import WindCard from './WindCard';
// import Map from './Map';

interface WeatherProps {
  departureAirport: Airport;
  destinationAirport: Airport;
  weatherChange: boolean;
  isDepartureEx: boolean;
}

export interface WeatherData {
  timestamp: number;
  wind_speed: number;
  wind_degrees: number;
  temp: number;
  humidity: number;
  sunset: number;
  min_temp: number;
  cloud_pct: number;
  feels_like: number;
  sunrise: number;
  max_temp: number;
}

const Weather: React.FC<WeatherProps> = ({
  departureAirport, 
  destinationAirport, 
  weatherChange,
  isDepartureEx}) => {

  const [weatherDataDeparture, setWeatherDataDeparture] = useState<WeatherData | null>(null);
  const [weatherDataDestination, setWeatherDataDestination] = useState<WeatherData | null>(null);

  async function GetTheWeather(): Promise<void> {

    const airport: Airport = isDepartureEx ? departureAirport : destinationAirport;
    const url: string = `https://api.api-ninjas.com/v1/weather?lat=${airport.latitude}&lon=${airport.longitude}`;
    const response = await fetch(url, {
      headers: {
        'X-Api-Key': 'AfauC+SiaJ04JjFEVLqYRg==JSDlxdwDKnzWMR1V'
      }
    })
    const data: WeatherData = await response.json();    
    console.log(data);
    if (isDepartureEx) {
      setWeatherDataDeparture(data);
    } else {
      setWeatherDataDestination(data);
    }    
  }  

  useEffect(() =>{
    if(weatherChange === true){ 
      GetTheWeather();
      alert("Weather data fetched successfully!");
    }
  },[weatherChange])

  return (
    <article className='Weather'>
         <h1>Weather</h1>
         <label htmlFor="DeaprtureAirportWeather" className='DeaprtureAirportWeather'>
            <img 
            src="https://www.svgrepo.com/show/530233/weather.svg" 
            alt="weather img" />          
            <h4>Departure Airport Weather</h4>
         </label>     
         <div className='ElementsWeather'>
         <WeatherBox 
          weather={weatherDataDeparture} 
          airport={departureAirport} />  
          <WindCard weather={weatherDataDeparture}/>
        </div>   

         <label htmlFor="DeaprtureAirportWeather" className='DeaprtureAirportWeather'>
            <img 
            src="https://www.svgrepo.com/show/530233/weather.svg" 
            alt="weather img" />          
            <h4>Destination Airport Weather</h4>
         </label>  
         <div className='ElementsWeather'>
          <WeatherBox 
            weather={weatherDataDestination} 
            airport={destinationAirport} />         
            <WindCard weather={weatherDataDestination}/>
          </div>      
    </article>
  );
}

export default Weather;