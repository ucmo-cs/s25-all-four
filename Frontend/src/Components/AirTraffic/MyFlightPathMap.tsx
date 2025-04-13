import { GoogleMap, Polyline, useJsApiLoader, GroundOverlay } from '@react-google-maps/api';
import './css/Map.css';
import { Airport } from './AirportsInfo';


interface MyFlightPathMapProps {
  DepartureAirport: Airport;
  DestinationAirport: Airport;
}

export default function MyFlightPathMap({ DepartureAirport, DestinationAirport }: MyFlightPathMapProps) {
  
  const center = { lat: 0, lng: -50 };
  
  const offset = 0.01; 
  const imageBounds: google.maps.LatLngBoundsLiteral = {
    north: DepartureAirport.latitude + offset,
    south: DepartureAirport.latitude - offset,
    east:  DepartureAirport.longitude + offset,
    west:  DepartureAirport.longitude - offset,
  };
  
  const flightPlanCoordinates = [
    { lat: DepartureAirport.latitude, lng: DepartureAirport.longitude},  
    { lat: DestinationAirport.latitude, lng: DestinationAirport.longitude},
  ];
  
  const polylineOptions: google.maps.PolylineOptions = {
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2,
  };

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',                   
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY!,
  });

  if (loadError) return <p>Error loading Google Maps</p>;
  if (!isLoaded)  return null;                 

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%' }}
      zoom={3}
      center={center}
      mapTypeId="terrain"
    >
    <Polyline path={flightPlanCoordinates} options={polylineOptions} 
    />
    <GroundOverlay
    url="https://webstockreview.net/images/clipart-airplane-trail-18.png"
    bounds={imageBounds}
    opacity={0.6}
  />
    </GoogleMap>
  );
}
