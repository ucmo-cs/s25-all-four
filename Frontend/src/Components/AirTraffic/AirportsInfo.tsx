import React from 'react';
import './css/AirportsInfo.css'

export interface AirportsInfoProps {
    departureAirport: Airport;
    destinationAirport: Airport;
}

export interface Airport {
    icao: string;
    iata: string;
    name: string;
    city: string;
    region: string;
    country: string;
    elevation_ft: number;
    latitude: number;
    longitude: number;
    timezone: string;
  }

  
const AirportsInfo: React.FC<AirportsInfoProps> = ({departureAirport, destinationAirport}) => {
  return (
    <article className='AirportsInfo'>
         <div className='AirportsContainer'>
            <div className='DepartureAirportInformation' style={{borderRight: '1px solid white'}}>
                <h1>
                    {
                        departureAirport.name !== '' ? departureAirport.name : 'Select a departure airport'
                    }
                </h1>
                <div className='AirportIndividualInformation'>
                    <h3>Country:</h3>
                    <p>
                        {
                            departureAirport.country !== '' ? departureAirport.country : '------'
                        }
                    </p>
                </div>
                <div className='AirportIndividualInformation'>
                    <h3>City:</h3>
                    <p>
                        {
                            departureAirport.city !== '' ? departureAirport.city : '------'
                        }
                    </p>
                </div>
                <div className='AirportIndividualInformation'>
                    <h3>Region:</h3>
                    <p>
                        {
                            departureAirport.region !== '' ? departureAirport.region : '------'
                        }
                    </p>
                </div>
                <div className='AirportIndividualInformation'>
                    <h3>ICAO Code:</h3>
                    <p>
                        {
                            departureAirport.icao !== '' ? departureAirport.icao : '------'
                        }
                    </p>
                </div>
                <div className='AirportIndividualInformation'>
                    <h3>Longitude:</h3>
                    <p>
                        {
                            departureAirport.longitude !== 0 ? departureAirport.longitude : '------'
                        }
                    </p>
                </div>
                <div className='AirportIndividualInformation'>
                    <h3>Timezone:</h3>
                    <p>
                        {
                            departureAirport.timezone !== '' ? departureAirport.timezone : '------'
                        }
                    </p>
                </div>
            </div>
            {/* Destination Airport */}
            <div className='DestinationAirportInformation'>
            <h1>
                    {
                        destinationAirport.name !== '' ? destinationAirport.name : 'Select a departure airport'
                    }
                </h1>
                <div className='AirportIndividualInformation'>
                    <h3>Country:</h3>
                    <p>
                        {
                            destinationAirport.country !== '' ? destinationAirport.country : '------'
                        }
                    </p>
                </div>
                <div className='AirportIndividualInformation'>
                    <h3>City:</h3>
                    <p>
                        {
                            destinationAirport.city !== '' ? destinationAirport.city : '------'
                        }
                    </p>
                </div>
                <div className='AirportIndividualInformation'>
                    <h3>Region:</h3>
                    <p>
                        {
                            destinationAirport.region !== '' ? destinationAirport.region : '------'
                        }
                    </p>
                </div>
                <div className='AirportIndividualInformation'>
                    <h3>ICAO Code:</h3>
                    <p>
                        {
                            destinationAirport.icao !== '' ? destinationAirport.icao : '------'
                        }
                    </p>
                </div>
                <div className='AirportIndividualInformation'>
                    <h3>Longitude:</h3>
                    <p>
                        {
                            destinationAirport.longitude !== 0 ? destinationAirport.longitude : '------'
                        }
                    </p>
                </div>
                <div className='AirportIndividualInformation'>
                    <h3>Timezone:</h3>
                    <p>
                        {
                            destinationAirport.timezone !== '' ? destinationAirport.timezone : '------'
                        }
                    </p>
                </div>
            </div>
         </div>
    </article>
  );
}

export default AirportsInfo;