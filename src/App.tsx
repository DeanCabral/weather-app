import { useState } from "react";

import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import CurrentWeather from "./components/cards/CurrentWeather";
import AdditionalInfo from "./components/cards/AdditionalInfo";
import Map from "./components/Map";
import type { Coords } from "./types";
import LocationDropdown from "./components/dropdowns/LocationDropdown";
import { getGeoCode } from "./api";
import { useQuery } from "@tanstack/react-query";
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown";

function App() {

  const [coordinates, setCoords] = useState<Coords>({ lat: 40, lon: 55 });
  const [location, setLocation] = useState<string>("London");
  const [mapType, setMapType] = useState<string>("clouds_new");

  const { data:geocodedata } = useQuery({
    queryKey: ['geocode', location],
    queryFn: () => getGeoCode(location),
  });

  const onMapClick = (lat: number, lon: number) => {
    setCoords({ lat, lon });
    setLocation(`Custom`);
  }

  const coords = location === "Custom" ? coordinates : { lat: geocodedata?.[0]?.lat ?? 0, lon: geocodedata?.[0]?.lon ?? 0 };

  console.log("coords", coords);

  return (
    <div className="flex flex-col gap-8">     
      <div className="flex gap-8">
        <div className="flex gap-4">
          <h1 className=" text-2xl font-semibold">Location</h1>
          <LocationDropdown location={location} setLocation={setLocation}/>
        </div>
        <div className="flex gap-4">
          <h1 className=" text-2xl font-semibold">Layers</h1>
          <MapTypeDropdown mapType={mapType} setMapType={setMapType}/>
        </div>      
      </div>  
      
      <Map coords={coords} mapType={mapType} onMapClick={onMapClick}/>
      <CurrentWeather coords={coords}/>
      <HourlyForecast coords={coords}/>
      <DailyForecast coords={coords}/>
      <AdditionalInfo coords={coords}/>
    </div>
  )
}

export default App
