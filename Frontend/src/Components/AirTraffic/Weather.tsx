import React, { useEffect, useState } from 'react';
import './css/Weather.css';
import WeatherBox from './WeatherBox';
import { Airport } from './AirportsInfo';

interface WeatherProps {
  departureAirport: Airport;
  destinationAirport: Airport;
  weatherChange: boolean;
}

export interface WeatherData {
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

const Weather: React.FC<WeatherProps> = ({departureAirport, destinationAirport, weatherChange}) => {

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  async function GetTheWeatherDeparture(): Promise<void> {
    const url: string = `https://api.api-ninjas.com/v1/weather?lat=${departureAirport.latitude}&lon=${departureAirport.longitude}`;
    const response = await fetch(url, {
      headers: {
        'X-Api-Key': 'AfauC+SiaJ04JjFEVLqYRg==JSDlxdwDKnzWMR1V'
      }
    })
    const data: WeatherData = await response.json();
    setWeatherData(data);
    console.log(data);
  }  

  useEffect(() =>{
    if(weatherChange === true){ 
      GetTheWeatherDeparture();
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
         <WeatherBox weather={weatherData} airport={departureAirport} setWeather={GetTheWeatherDeparture}/>         
         <label htmlFor="DeaprtureAirportWeather" className='DeaprtureAirportWeather'>
            <img 
            src="https://www.svgrepo.com/show/530233/weather.svg" 
            alt="weather img" />          
            <h4>Destination Airport Weather</h4>
         </label>        
         <WeatherBox weather={weatherData} airport={destinationAirport} setWeather={GetTheWeatherDeparture}/>         
    </article>
  );
}

export default Weather;