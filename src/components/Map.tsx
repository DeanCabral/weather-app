import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import type { Coords } from '../types'

type Props = {
    coords: Coords
    onMapClick: (lat: number, lon: number) => void
}

export default function Map({coords, onMapClick}: Props) {
  return (
    <MapContainer center={[coords.lat, coords.lon]} zoom={5} style={{ height: "500px", width: "700px", zIndex: 0 }}>
        <MapClick onMapClick={onMapClick} />
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[coords.lat, coords.lon]}/>
    </MapContainer>
  )
}

function MapClick({ onMapClick }: { onMapClick: (lat: number, lon: number) => void }) {
    const map = useMap();

    map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        console.log(`Clicked at latitude: ${lat}, longitude: ${lng}`);
        map.panTo([lat, lng]);
        onMapClick(lat, lng);
    });

    return null;
}