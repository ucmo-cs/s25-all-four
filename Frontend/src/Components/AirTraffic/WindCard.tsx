import React, { useEffect, useState } from 'react';
import './css/WindCard.css'
import wind0 from './imgs/Wind0.svg';
import wind1 from './imgs/wind_1.svg'
import wind2 from './imgs/wind2.svg'
import wind3 from './imgs/wind3.svg'
import wind4 from './imgs/wind4.svg'
import wind5 from './imgs/wind5.svg'
import { WeatherData } from './Weather';
import { Airport } from './AirportsInfo';

interface WindCardProps{
  weather: WeatherData | null;
  Airport: Airport | null;
}
const WindCard: React.FC<WindCardProps> = ({weather, Airport}) => {
  const [ImgWind, setImgWind] = useState<any>(wind0)
  const imgWait: string = 'https://www.svgrepo.com/show/429915/not-found-error-alert.svg'

  function classifyWindSpeed(): string {
    if (weather) {
      const windKmh = weather.wind_speed * 3.6;
      
      if (windKmh >= 0 && windKmh <= 5) {
        return "Calm";
      } else if (windKmh > 5 && windKmh <= 11) {
        return "Light breeze";
      } else if (windKmh > 11 && windKmh <= 19) {
        return "Gentle breeze";
      } else if (windKmh > 19 && windKmh <= 28) {
        return "Moderate breeze";
      } else if (windKmh > 28 && windKmh <= 38) {
        return "Fresh breeze";
      } else if (windKmh > 38 && windKmh <= 49) {
        return "Strong breeze";
      } else if (windKmh > 49 && windKmh <= 61) {
        return "Near gale";
      } else if (windKmh > 61 && windKmh <= 74) {
        return "Gale";
      } else if (windKmh > 74) {
        return "Severe gale / Storm";
      }
    }
    
    return "No data";
  }
  
  useEffect(() =>{
    const changeWindImg = () => {
      if (weather) {
        const windKmh = weather.wind_speed * 3.6;
        
        if (windKmh >= 0 && windKmh <= 5) {
          setImgWind(wind0);
        } else if (windKmh > 5 && windKmh <= 11) {
          setImgWind(wind1);
        } else if (windKmh > 11 && windKmh <= 19) {
          setImgWind(wind2);
        } else if (windKmh > 19 && windKmh <= 28) {
          setImgWind(wind3);
        } else if (windKmh > 28 && windKmh <= 38) {
          setImgWind(wind3);
        } else if (windKmh > 38 && windKmh <= 49) {
          setImgWind(wind4);
        } else if (windKmh > 49 && windKmh <= 61) {
          setImgWind(wind4);
        } else if (windKmh > 61 && windKmh <= 74) {
          setImgWind(wind5);
        } else if (windKmh > 74) {
          setImgWind(wind5);
        }
      } else setImgWind(imgWait)           
    }
    changeWindImg()
  },[weather?.wind_speed])


  return (
    <div className="WindCard">
    <div className="card-border-top">
    </div>
    <div className="WindImg">
      <img 
        src={ImgWind} 
        alt="wind img" />
    </div>
    <span>
      {
        !weather?.wind_speed ? 'No data' : classifyWindSpeed()
      }
    </span>
    <p className="job">
      {
        !weather?.wind_speed ? 'No Data' : 
        Airport?.country === 'US' ? `${Math.round(weather.wind_speed * 0.621371).toString().substring(0,5)} Miles per hour `
        : `${(weather.wind_speed * 3.6).toString().substring(0,5)} km per hour `
      }
    </p>    
  </div>
  );
}

export default WindCard;