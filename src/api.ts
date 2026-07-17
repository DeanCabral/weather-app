import { GeocodeSchema } from "./schemas/GeocodeSchema";
import { OneCallSchema } from "./schemas/OneCallSchema";

const API_KEY = import.meta.env.VITE_API_KEY; 

export async function getWeather({lat, lon}: {lat: number, lon: number}) {
   const res = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,alerts&appid=${API_KEY}`);

   if (!res.ok) throw new Error(`Weather request failed with status ${res.status}`);

   const data = await res.json();
   return OneCallSchema.parse(data);
}

export async function getGeoCode(location: string) {
   const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`);

   if (!res.ok) throw new Error(`Geolocation request failed with status ${res.status}`);

   const data = await res.json();
   return GeocodeSchema.parse(data);
}