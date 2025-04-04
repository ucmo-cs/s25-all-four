import React, { useEffect, useRef, useState } from 'react';
import './css/WeatherBox.css';
import { Airport } from './AirportsInfo';
import { WeatherData } from './Weather';

interface WeatherBoxProps {
  weather: WeatherData | null;
  airport: Airport;
}

const WeatherBox: React.FC<WeatherBoxProps> = ({weather, airport}) => {  

  const WeatherBackground1 = useRef<HTMLDivElement>(null);
  const WeatherBackground2 = useRef<HTMLDivElement>(null);
  const [weatherImg, setWeatherImg] = useState<string>('https://www.svgrepo.com/show/469195/loading.svg');

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
        WeatherBackground1.current!.style.backgroundColor = '#FFDDAB';
        WeatherBackground2.current!.style.backgroundColor = '#FFDDAB';
      }
      else if(weather.temp >= 30){
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

  useEffect(() => {
    if(weather){
      if(weather.cloud_pct < 10){
        setWeatherImg('https://www.svgrepo.com/show/503805/sun.svg')        
      }
      else if(weather.cloud_pct < 30 && weather!.cloud_pct >= 10){
        setWeatherImg('https://www.svgrepo.com/show/313149/partally-sunny.svg')        
      }
      else if(weather.cloud_pct < 50 && weather!.cloud_pct >= 30){
        setWeatherImg('https://www.svgrepo.com/show/313149/partally-sunny.svg')        
      }
      else if(weather.cloud_pct < 70 && weather!.cloud_pct >= 50){
        setWeatherImg('https://www.svgrepo.com/show/463469/cloudy.svg')        
      }
      else if(weather.cloud_pct < 90 && weather!.cloud_pct >= 70){
        setWeatherImg('https://www.svgrepo.com/show/463469/cloudy.svg')
      }
      else if(weather.cloud_pct >= 90){
        setWeatherImg('https://www.svgrepo.com/show/295696/cloudy-cloud.svg')
      }    
      else{
        setWeatherImg('https://www.svgrepo.com/show/209459/error.svg')
      }
    } else{      
    }
  },[weather])

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
                <img 
                  className='WeatherImg'
                  src={weatherImg} 
                  alt="Weather img" />
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
