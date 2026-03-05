import React from 'react'
import './MapComponent.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


const MapComponent = () => {
    const position = [ -1.314, 36.918]; 
  return (
    <>
    <div className="leaflet-container">
    <MapContainer 
            center={position} 
            zoom={17} 
            style={{ height: "500px", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
                <Popup>
                    Don Records, Tsavo
                </Popup>
            </Marker>
        </MapContainer>
        </div>
        </>
  )
}

export default MapComponent