import { useSuspenseQuery } from '@tanstack/react-query';
import Card from './Card'
import { getWeather } from '../../api';

import Sunrise from '/src/assets/icons/sunrise.svg?react';
import Sunset from '/src/assets/icons/sunset.svg?react';
import Cloud from '/src/assets/icons/cloud.svg?react';
import Uv from '/src/assets/icons/uv.svg?react';
import Wind from '/src/assets/icons/wind.svg?react';
import Pressure from '/src/assets/icons/pressure.svg?react';
import UpArrow from '/src/assets/icons/uparrow.svg?react';
import type { Coords } from '../../types';

type Props = {
    coords: Coords
};

export default function AdditionalInfo({coords}: Props) {
    const { data } = useSuspenseQuery({
        queryKey: ["weather", coords],
        queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
    });
  return (
    <Card title="Additional Weather Info" childrenClassName="flex flex-col gap-8">
        {rows.map(({label, value, Icon}) => (
            <div key={value} className="flex justify-between">
                <div className="flex gap-4">
                    <span className="text-gray-500">{label}</span>
                    <Icon className="size-8 invert" />
                </div>
                <span>{FormatComponent({ value, number: data.current[value as keyof typeof data.current] })}</span>
            </div>
        ))}    
    </Card>
  )
}

function FormatComponent({value, number}: {value:string, number: number | { id: number; main: string; description: string; icon: string; }[] | undefined}) {
  if (number == null) return '-';
  if (value === 'sunrise' || value === 'sunset') return new Date((number as number) * 1000).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit", hour12: true });
  if (value === 'weather' && Array.isArray(number)) return number.map(n => n.description).join(', ');
  if (value === 'wind_deg') return <UpArrow className="size-8 invert" style={{transform: `rotate(${number}deg)`}} />;
  return number as number;
}

const rows = [
  {
    label: 'Cloudiness (%)',
    value: 'clouds',
    Icon: Cloud,
  },
  {
    label: 'UV Index',
    value: 'uvi',
    Icon: Uv,
  },
  {
    label: 'Wind Direction',
    value: 'wind_deg',
    Icon: Wind,
  },
  {
    label: 'Pressure',
    value: 'pressure',
    Icon: Pressure,
  },
  {
    label: 'Sunrise',
    value: 'sunrise',
    Icon: Sunrise,
  },
  {
    label: 'Sunset',
    value: 'sunset',
    Icon: Sunset,
  },
] as const;