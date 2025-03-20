import React, { useRef, useState } from 'react';
import './css/AirTrafficConditions.css'
import { Airport } from './AirportsInfo';

interface AirTrafficConditionsProps {
  setSelectedDepartureAirport: (airport: Airport) => void;
  setSelectedDestinationAirport: (airport: Airport) => void;
}

const AirTrafficConditions: React.FC<AirTrafficConditionsProps> = ({
  setSelectedDepartureAirport,
  setSelectedDestinationAirport,

}) => {

  const [departureAirport, setDepartureAirport] = useState<Airport[]>([])

  const [departureAirportCode, setDepartureAirportCode] = useState<string>('')
  const [destinationAirport, setDestinationAirport] = useState<Airport[]>([])
  const [destinationAirportCode, setDestinationAirportCode] = useState<string>('')
  const departureList = useRef<HTMLUListElement>(null)
  const destinationList = useRef<HTMLUListElement>(null)

  async function CallAirport(isDeparture: boolean, Code: string): Promise<void> {  
    if (Code.trim() === '') return
    
    try{
      const url: string = `https://api.api-ninjas.com/v1/airports?name=${Code}`
      const response = await fetch(url, {
        headers: {
          'X-Api-Key': 'AfauC+SiaJ04JjFEVLqYRg==JSDlxdwDKnzWMR1V'
        }
      })
      const airports: Airport[] = await response.json()
      if(isDeparture === true) setDepartureAirport(airports)
      else setDestinationAirport(airports)

      console.log(airports)
    } catch(e:any){
      alert(e)
    }
    finally{
      if(isDeparture === true){
        departureList.current!.style.display = 'flex'
        setTimeout(() => {        
          departureList.current!.style.height = '2000%'        
          destinationList.current!.style.height = '2000%'
        }, 50);
        setDepartureAirportCode('')
      } else{
        destinationList.current!.style.display = 'flex'
        setTimeout(() => {                  
          destinationList.current!.style.height = '2000%'
        }, 50);
        setDestinationAirportCode('')
      }
    }
  }

  function SelectDepartureAirport(airportIndex: number, isDeparture: boolean): void {
    if(isDeparture === true) setSelectedDepartureAirport(departureAirport[airportIndex])
    else setSelectedDestinationAirport(destinationAirport[airportIndex])      

  }

  function CloseAirportList(isDeparture: boolean): void {
    if(isDeparture === true){
      departureList.current!.style.height = '0%'
      setTimeout(() => {
        departureList.current!.style.display = 'none'
      }, 600);
    } else{
      destinationList.current!.style.height = '0%'
      setTimeout(() => {
        destinationList.current!.style.display = 'none'
      }, 600);

    }
  }

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
              <ul className='AirportList' ref={departureList} onMouseLeave={() => CloseAirportList(true)}>
                {
                  departureAirport.length === 0 ? <li>No airports found</li> :
                  departureAirport.map((airport: Airport, key) => {
                    return <li key={key} onClick={() => SelectDepartureAirport(key, true)}>{airport.name}</li>
                  })
                }
              </ul>
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
              <ul className='AirportList' ref={destinationList} onMouseLeave={() => CloseAirportList(false)}>
                {
                  destinationAirport.length === 0 ? <li>No airports found</li> :
                  destinationAirport.map((airport: Airport, key) => {
                    return <li key={key} onClick={() => SelectDepartureAirport(key, false)}>{airport.name}</li>
                  })
                }
              </ul>
            </div>
        </label>

        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4774.263566086716!2d-78.3631433242825!3d-0.12422173546156827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d58db4352baa87%3A0x2f9f7623e0894b8b!2sMariscal%20Sucre%20Quito%20International%20Airport!5e1!3m2!1sen!2sus!4v1742412567000!5m2!1sen!2sus" 
        width="300" 
        height="200"  
        loading="lazy">
        </iframe>

    </article>
  );
}

export default AirTrafficConditions;