import React from 'react';
import MyFlightPathMap from './MyFlightPathMap';
import { IClose } from '../Profile/NewProject';
import { Airport } from './AirportsInfo';

interface IGetAirports{
    Departure: Airport;
    Destination: Airport;
}
interface IMapPopUpProps extends IClose, IGetAirports {}

const MapPopUp: React.FC<IMapPopUpProps> = ({close, setClose, Departure, Destination}) => {
  return (
    <>
    {
        close && (
        <section className='MapPopUp'>
            <div className='CloseMaps' onClick={() => setClose(!close)}>X</div>
            <div className='GoogleMapContainer'>
             <MyFlightPathMap DepartureAirport={Departure} DestinationAirport={Destination}/>
            </div>
        </section>
        )
    }
    </>
    
  );
}

export default MapPopUp;