import { useSuspenseQuery } from '@tanstack/react-query';
import { getWeather } from '../../api';
import Card from './Card';
import WeatherIcon from '../WeatherIcon';

type Props = {}

export default function CurrentWeather({}: Props) {
    const { data } = useSuspenseQuery({
        queryKey: ["weather"],
        queryFn: () => getWeather({ lat: 10, lon: 25 }),
    });
  return (
    <Card title="Current Weather" childrenClassName="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2">
            <h2 className="text-6xl font-semibold text-center">{Math.round(data.current.temp)}°C</h2>
            <WeatherIcon className="size-14" src={data.current.weather[0].icon} />
            <h3 className="capitalize text-xl">{data.current.weather[0].description}</h3>            
        </div>  
        <div className="flex flex-col gap-2">
            <p className="text-xl text-center">Local Time</p>
            <h3 className="text-4xl font-semibold">{new Intl.DateTimeFormat('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
                timeZone: data.timezone
            }).format(new Date(data.current.dt * 1000))}</h3>
        </div>
        <div className="flex justify-between w-full">
            <div className="flex flex-col items-center gap-2">
                <p className="text-gray-500 text-center">Feels Like</p>
                <h3 className="">{Math.round(data.current.feels_like)}°C</h3>
            </div>
            <div className="flex flex-col items-center gap-2">
                <p className="text-gray-500">Humidity</p>
                <h3 className="">{data.current.humidity}%</h3>
            </div>
            <div className="flex flex-col items-center gap-2">
                <p className="text-gray-500">Wind</p>
                <h3 className="">{data.current.wind_speed}mph</h3>
            </div>
        </div>
    </Card>    
  )
}