import React from "react";
declare global {
  interface Window {
    initMap: () => void;
  }
}


const Map: React.FC = () => {

  function initMap() {
    const mapDiv = document.getElementById("map") as HTMLElement; // assertion or check for null
    const map = new google.maps.Map(mapDiv, {
      zoom: 5,
      center: { lat: 24.886, lng: -70.268 },
      mapTypeId: "terrain",
    });
    
    // Define the LatLng coordinates for the polygon's path.
    const triangleCoords = [
      { lat: 25.774, lng: -80.19 },
      { lat: 18.466, lng: -66.118 },
      { lat: 32.321, lng: -64.757 },
      { lat: 25.774, lng: -80.19 },
    ];
  
    // Construct the polygon.
    const bermudaTriangle = new google.maps.Polygon({
      paths: triangleCoords,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
    });
    
    bermudaTriangle.setMap(map);
  }
  
  window.initMap = initMap;
  
  return (
    <section className="Map">
      <div
        id="map"
        style={{ width: "100%", height: "400px" }}
      />
      <script
        src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap&v=weekly"
        defer
      />
      hola
    </section>
  );
};

export default Map;
