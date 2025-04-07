import React, { useState, useEffect } from 'react';
import './css/Notmas.css';
// import QuitoData from './QuitoTraffic.json';
import { Airport } from './AirportsInfo';

interface AirportsInfoProps {
  departureAirport: Airport;
  destinationAirport: Airport;
  weatherChange: boolean;
  isDepartureEx: boolean;
}

interface Notam {
  id: string;
  entity: string;
  status: string;
  Qcode: string;
  Area: string;
  SubArea: string;
  Condition: string;
  Subject: string;
  Modifier: string;
  message: string;
  startdate: string;
  enddate: string;
  all: string;
  location: string;
  isICAO: boolean;
  Created: string;
  key: string;
  type: string;
  StateCode: string;
  StateName: string;
  criticality: number;
}

interface USNOTAMSInfo {
  StateCode: string;
  StateName: string;
  all: string;
  criticality: number;
  id: string;
  isICAO: boolean;
  key: string;
  location: string;
  type: string;
}

const Notmas: React.FC<AirportsInfoProps> = ({ 
  departureAirport, 
  destinationAirport, 
  weatherChange, 
  isDepartureEx }) => {

  const [notamsDeparture, setNotamsDeparture] = useState<Notam[]>([]);
  const [notamsDestination, setNotamsDestination] = useState<Notam[]>([]);

  const [notamsDepartureUS, setNotamsDepartureUS] = useState<USNOTAMSInfo[]>([]);
  const [notamsDestinationUS, setNotamsDestinationUS] = useState<USNOTAMSInfo[]>([]);

  async function HandleNotams(): Promise<void> {

    try{
      const Airport: Airport = isDepartureEx ? departureAirport : destinationAirport;
      const url: string = `https://applications.icao.int/dataservices/api/notams-realtime-list?api_key=973dab72-fdca-464a-b3fc-59d368737b0a&format=json&criticality=ALL&locations=${Airport.icao}`;
      // const url: string = ''
      const response = await fetch(url);
      const data: Notam[] = await response.json();
      
      console.log(data);
      if(isDepartureEx){
        if(departureAirport.country === 'US') setNotamsDepartureUS(data)
        else setNotamsDeparture(data);
      } 
      else {
        if(destinationAirport.country === 'US') setNotamsDestinationUS(data)
        else setNotamsDestination(data);   
      }
       
    } catch (error) {
      alert('Error fetching NOTAMS. Please try again later.');
      setNotamsDeparture([]);
      setNotamsDestination([]);
      setNotamsDepartureUS([])
      setNotamsDestinationUS([])
    }
  
  }

  function DisplayMessage(notam: Notam): void{
    alert(
      `Subject: ${notam.Subject}
      \nModifier: ${notam.Modifier}
      \nCriticality: ${notam.criticality}
      \nMessage: ${notam.message}
      \nStart date: ${notam.startdate}
      \nEnd date: ${notam.enddate}`
    );
  }
  function DisplayMessageUS(notam: USNOTAMSInfo): void{
    alert(
      `State code: ${notam.StateCode}
      \nState name: ${notam.StateName}
      \nNotification: ${notam.all}
      \nCriticality: ${notam.criticality}
      \nNOTAM ID: ${notam.id}
      \nNOTAM location: ${notam.location}`
    );
  }

  // Fetch new departure NOTAMs whenever the departure airport changes
  useEffect(() => {
    if(departureAirport.icao === '') return;
    if(weatherChange === true){     
      HandleNotams()
      alert('Fetching NOTAMS for departure airport...');     
    }
  }, [weatherChange]);


  return (
    <article className='Notmas'>
      <h1>NOTAMS</h1>

      {/* Departure NOTAMs */}
      <div className='NotmasBox'>
        <h4>Departure Airport NOTAMS</h4>
        <article className='NotmasBoxContent'>
          {notamsDeparture.length === 0 && notamsDepartureUS.length === 0? (
            <div className='NotamItem'>
              <h5>No NOTAMS</h5>
              <p>Select an airport or wait until we get your NOTAMS</p>
            </div>
          ) : (            
            departureAirport.country === 'US' ? 
            notamsDepartureUS.map((notam: USNOTAMSInfo) => 
              (
                  <div className='NotamItem' key={notam.key} onClick={() => DisplayMessageUS(notam)}>
                    <h4>{notam.key}</h4>
                    <h4>{notam.criticality}</h4>
                    <h5>{notam.id}</h5>                  
                  </div>
              )
            ) :
            notamsDeparture.map((notam: Notam) => 
              (
                  <div onClick={() => DisplayMessage(notam)} className='NotamItem' key={notam.key}>
                    <h4>{notam.Subject}</h4>
                    <h4>{notam.SubArea}</h4>
                    <h5>{notam.Modifier}</h5>                  
                  </div>
              )
            )
          )}
        </article>
      </div>

      {/* Destination NOTAMs */}
      <div className='NotmasBox'>
        <h4>Destination Airport NOTAMS</h4>
        <article className='NotmasBoxContent'>
        {notamsDestination.length === 0 && notamsDestinationUS.length === 0 ? (
          <div className='NotamItem'>
            <h5>No NOTAMS</h5>
            <p>Select an airport or wait until we get your NOTAMS</p>
          </div>
        ) : (
          destinationAirport.country === 'US'
            ? notamsDestinationUS.map((notam) => (
                <div
                  className='NotamItem'
                  key={notam.key}
                  onClick={() => DisplayMessageUS(notam)}
                >
                  <h4>{notam.key}</h4>
                  <h4>{notam.criticality}</h4>
                  <h5>{notam.id}</h5>
                </div>
              ))
            : notamsDestination.map((notam) => (
                <div
                  onClick={() => DisplayMessage(notam)}
                  className='NotamItem'
                  key={notam.key}
                >
                  <h4>{notam.Subject}</h4>
                  <h4>{notam.SubArea}</h4>
                  <h5>{notam.Modifier}</h5>
                </div>
              ))
        )}
        </article>
      </div>
    </article>
  );
};

export default Notmas;
