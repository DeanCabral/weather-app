import Card from "./Card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types";

type Props = {
    coords: Coords
};

export default function HourlyForecast({coords}: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });

  return (
    <Card title="Hourly Forecast" childrenClassName="flex gap-4 overflow-x-scroll">
      {data?.hourly.map((hour) => (
          <div key={hour.dt} className="flex flex-col gap-2 items-center p-2">
            <p className="text-sm whitespace-nowrap">{new Date(hour.dt * 1000).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit", hour12: true })}</p>
            <WeatherIcon src={hour.weather[0].icon} />
            <p className="t">{Math.round(hour.temp)}°C</p>
          </div>
        ))}
    </Card>
  );
}
