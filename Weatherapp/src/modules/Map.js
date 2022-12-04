import React from 'react'
import {
    MapContainer,
    TileLayer
} from "react-leaflet"
import "leaflet/dist/leaflet.css"
function Maps() {
    const center = [10.77, 10.88]
    return (
        <MapContainer
            center={center}
            zoom={10}
            style={{ width: '100vw', height: '100vh' }}      
        >
            <TileLayer 
                url='https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=hfMKA5NRb8gJmjnMXHqI'
            ></TileLayer>
        </MapContainer>
    )
}

export default Maps