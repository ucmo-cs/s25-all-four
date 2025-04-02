import React, { useState, useEffect } from 'react';
import './css/Notmas.css';
import QuitoData from './QuitoTraffic.json';

interface AirportsInfoProps {
  departureAirport: { icao: string };
  destinationAirport: { icao: string };
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

const Notmas: React.FC<AirportsInfoProps> = ({ departureAirport, destinationAirport }) => {
  const [notamsDeparture, setNotamsDeparture] = useState<Notam[]>([]);
  const [notamsDestination, setNotamsDestination] = useState<Notam[]>([]);

  async function getNotamsDeparture(): Promise<void> {
    const url = `https://applications.icao.int/dataservices/api/notams-realtime-list?api_key=bd29dc5e-41b6-4a33-ae25-7eed7402a8fb&=json&criticality=ALL&locations=${departureAirport.icao}`;
    
    const response = await fetch(url);
    const data: Notam[] = await response.json();
    console.log(data);
    setNotamsDeparture(data);
  }

  function DisplayMessage(notam: Notam): void{
    alert(
      `Subject: ${notam.Subject}
      \nModifier: ${notam.Modifier}
      \nMessage: ${notam.message}
      \nStart date: ${notam.startdate}`);

  }

  async function getNotamsDestination(): Promise<void> {
    const url = `https://applications.icao.int/dataservices/api/notams-realtime-list?api_key=bd29dc5e-41b6-4a33-ae25-7eed7402a8fb&format=json&criticality=ALL&locations=${destinationAirport.icao}`;
    
    const response = await fetch(url);
    const data: Notam[] = await response.json();
    console.log(data);
    setNotamsDestination(data);
  }

  // Fetch new departure NOTAMs whenever the departure airport changes
  useEffect(() => {
    if(departureAirport.icao === '') return;
    getNotamsDeparture();
  }, [departureAirport]);

  // Fetch new destination NOTAMs whenever the destination airport changes
  useEffect(() => {
    if(destinationAirport.icao === '') return;
    getNotamsDestination();
  }, [destinationAirport]);

  return (
    <article className='Notmas'>
      <h1>NOTAMS</h1>

      {/* Departure NOTAMs */}
      <div className='NotmasBox'>
        <h4>Departure Airport NOTAMS</h4>
        <article className='NotmasBoxContent'>
          {QuitoData.length === 0 ? (
            <div className='NotamItem'>
              <h5>No NOTAMS</h5>
              <p>Select an airport or wait until we get your NOTAMS</p>
            </div>
          ) : (
            QuitoData.map((notam: Notam) => 
            (
                <div onClick={() => DisplayMessage(notam)} className='NotamItem' key={notam.key}>
                  <h4>{notam.Subject}</h4>
                  <h4>{notam.SubArea}</h4>
                  <h5>{notam.Modifier}</h5>                  
                </div>
            ))
          )}
        </article>
      </div>

      {/* Destination NOTAMs */}
      <div className='NotmasBox'>
        <h4>Destination Airport NOTAMS</h4>
        <article className='NotmasBoxContent'>
          {/* {notamsDestination.length === 0 ? (
            <div className='NotamItem'>
              <h5>No NOTAMS</h5>
              <p>Select an airport or wait until we get your NOTAMS</p>
            </div>
          ) : (
            notamsDestination.map((notam: Notam) => {
              return (
                <div onClick={() => DisplayMessage(notam)} className='NotamItem' key={notam.key}>
                  <h4>{notam.Subject}</h4>
                  <h4>{notam.SubArea}</h4>
                  <h5>{notam.Modifier}</h5>                  
                </div>
              );
            })
          )} */}
        </article>
      </div>
    </article>
  );
};

export default Notmas;
