import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import type { Coords } from '../types'
import { useEffect } from 'react'
import { MaptilerLayer } from '@maptiler/leaflet-maptilersdk'

type Props = {
    coords: Coords
    mapType: string
    onMapClick: (lat: number, lon: number) => void
}

const API_KEY = import.meta.env.VITE_API_KEY; 

export default function Map({coords, mapType, onMapClick}: Props) {
  return (
    <MapContainer center={[coords.lat, coords.lon]} zoom={5} style={{ height: "500px", width: "1000px", zIndex: 0 }}>
        <MapClick onMapClick={onMapClick} coords={coords} />
        <MapTileLayer />
        <TileLayer
            opacity={0.5}
            url={`https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${API_KEY}`}
        />
        <Marker position={[coords.lat, coords.lon]}/>
    </MapContainer>
  )
}

function MapClick({ onMapClick, coords }: { onMapClick: (lat: number, lon: number) => void; coords: Coords }) {
    const map = useMap();

    map.panTo([coords.lat, coords.lon]);

    map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        console.log(`Clicked at latitude: ${lat}, longitude: ${lng}`);        
        onMapClick(lat, lng);
    });

    return null;
}

function MapTileLayer() {
    const map = useMap();

    useEffect(() => {
        const tileLayer = new MaptilerLayer({style: 'basic-dark', apiKey: 'sxJR3OeYFdXNQT1o6zcR'});
        tileLayer.addTo(map);

        return () => {
            map.removeLayer(tileLayer);
        }   
    }, [map]);

    return null;
}