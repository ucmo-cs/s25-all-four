import React, { useEffect, useRef } from 'react';
import './css/WeatherBox.css';
import { Airport } from './AirportsInfo';
import { WeatherData } from './Weather';

interface WeatherBoxProps {
  weather: WeatherData | null;
  airport: Airport;
  setWeather: () => void;
}

const WeatherBox: React.FC<WeatherBoxProps> = ({weather, airport}) => {  

  const WeatherBackground1 = useRef<HTMLDivElement>(null);
  const WeatherBackground2 = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    ChangeBackgroundColor()
  },[weather])

  function ChangeBackgroundColor(): void{
    if(weather){
      if(weather.temp < 0){
        WeatherBackground1.current!.style.backgroundColor = '#4486b4';
        WeatherBackground2.current!.style.backgroundColor = '#4486b4';
      }
      else if(weather.temp>= 0 && weather.temp < 10){
        WeatherBackground1.current!.style.backgroundColor = '#A4C8E1';
        WeatherBackground2.current!.style.backgroundColor = '#A4C8E1';
      }
      else if(weather.temp >= 10 && weather.temp < 20){
        WeatherBackground1.current!.style.backgroundColor = '#f4fabc';
        WeatherBackground2.current!.style.backgroundColor = '#f4fabc';
      }
      else if(weather.temp >= 20 && weather.temp < 30){
        WeatherBackground1.current!.style.backgroundColor = '#fa7b40';
        WeatherBackground2.current!.style.backgroundColor = '#fa7b40';
      }
      else if(weather.temp > 30){
        WeatherBackground1.current!.style.backgroundColor = '#aa1400';
        WeatherBackground2.current!.style.backgroundColor = '#aa1400';
      }
    }
  }

  function GetCloudInformation(): string{
    if(weather){
      if(weather.cloud_pct < 10){
        return 'Clear'
      }
      else if(weather.cloud_pct < 30 && weather!.cloud_pct >= 10){
        return 'Mostly Sunny'
      }
      else if(weather.cloud_pct < 50 && weather!.cloud_pct >= 30){
        return 'Partly Cloudy'
      }
      else if(weather.cloud_pct < 70 && weather!.cloud_pct >= 50){
        return 'Cloudy'
      }
      else if(weather.cloud_pct < 90 && weather!.cloud_pct >= 70){
        return 'Mostly Cloudy'
      }
      else if(weather.cloud_pct >= 90){
        return 'Overcast'
      }    
      else{
        return 'no data'
      }
    } else{
      return 'no data'
    }
  }

  function GetHumidityInformation(): string {
    if (weather) {
      if (weather!.humidity < 30) {
        return 'Dry';
      } else if (weather!.humidity >= 30 && weather!.humidity < 50) {
        return 'Comfortable humidity';
      } else if (weather!.humidity >= 50 && weather!.humidity < 70) {
        return 'Humid';
      } else if (weather!.humidity >= 70 && weather!.humidity < 90) {
        return 'Very Humid';
      } else if (weather!.humidity >= 90) {
        return 'Extremely Humid';
      } else {
        return 'no data';
      }
    } else {
      return 'no data';
    }
  }
  

  return (    
      <div className="card" ref={WeatherBackground1}>
        <section className="info-section">
          <div className="background-design" ref={WeatherBackground2}>
            <div className="circle" />
            <div className="circle" />
            <div className="circle" />
          </div>
          <div className="left-side">
            <div className="weather">
              <div>
                <svg stroke="#ffffff" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                  <g strokeWidth={0} id="SVGRepo_bgCarrier" />
                  <g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier" />
                  <g id="SVGRepo_iconCarrier">
                    <path d="M512 704a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm0-704a32 32 0 0 1 32 32v64a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 768a32 32 0 0 1 32 32v64a32 32 0 1 1-64 0v-64a32 32 0 0 1 32-32zM195.2 195.2a32 32 0 0 1 45.248 0l45.248 45.248a32 32 0 1 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm543.104 543.104a32 32 0 0 1 45.248 0l45.248 45.248a32 32 0 0 1-45.248 45.248l-45.248-45.248a32 32 0 0 1 0-45.248zM64 512a32 32 0 0 1 32-32h64a32 32 0 0 1 0 64H96a32 32 0 0 1-32-32zm768 0a32 32 0 0 1 32-32h64a32 32 0 1 1 0 64h-64a32 32 0 0 1-32-32zM195.2 828.8a32 32 0 0 1 0-45.248l45.248-45.248a32 32 0 0 1 45.248 45.248L240.448 828.8a32 32 0 0 1-45.248 0zm543.104-543.104a32 32 0 0 1 0-45.248l45.248-45.248a32 32 0 0 1 45.248 45.248l-45.248 45.248a32 32 0 0 1-45.248 0z" fill="#ffffff" />
                  </g>
                </svg>
              </div>
              <div style={{width: '9em'}}>{GetCloudInformation()}</div>
            </div>
            <div className="temperature">              
              {
                !weather?.temp ? '---' : `${weather?.temp}°`
              }
            </div>
            <div className="range">
              {
                !weather?.min_temp ? '---' : `${weather?.min_temp}°`
              }/
              {
                !weather?.max_temp ? '---' : `${weather?.max_temp}°`
              }
              </div>
          </div>
          <div className="right-side">
            <div>              
            </div>
            <div className="city">{airport.city}</div>
          </div>
        </section>
        <div className="hour" style={{color: '#ffffff'}}>                
                {
                  !weather?.humidity ? '---' : GetHumidityInformation()
                }
              </div>        
      </div>    
  );
}


export default WeatherBox;
