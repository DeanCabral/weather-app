import { getAirPollution } from '@/api';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react'

import type { Coords } from "../types";
import Card from './cards/Card';
import { Slider } from './ui/slider';
import clsx from 'clsx';

type Props = {
    coords: Coords
}

export default function SidePanel(props: Props) {
  return (
    <div className="fixed top-0 right-0 h-screen w-90 shadow-md bg-sidebar py-8 px-4 overflow-y-scroll">
        <Suspense>
            <AirPollution {...props} />
        </Suspense> 
    </div>
  )
}

function AirPollution({coords} : Props) {
    const {data} = useSuspenseQuery({
        queryKey: ['pollution', coords],
        queryFn: () => getAirPollution(coords),
    });

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Air Pollution</h1>
            <h1 className="text-5xl font-semibold">{data.list[0].main.aqi}</h1>
            <h1 className="text-2xl font-semibold">AQI</h1>
            {Object.entries(data.list[0].components).map(([key, value]) => {
                const pollutant = airqual[key.toUpperCase() as keyof typeof airqual];
                if (!pollutant) return null;
                const max = Math.max(pollutant['Very Poor'].min, value);
                const current = () => {
                    for (const [quality, range] of Object.entries(pollutant)) {
                        if (value >= range.min && value < range.max) {
                            return quality;
                        }
                    }
                };

                const qualitycolor = () => {
                    switch (current()) {
                        case "Good":
                            return "bg-green-500 text-white";
                        case "Fair":
                            return "bg-yellow-500 text-white";
                        case "Moderate":
                            return "bg-orange-500 text-white";
                        case "Poor":
                            return "bg-red-500 text-white";
                        case "Very Poor":
                            return "bg-purple-500 text-white";
                        default:
                            return "bg-zinc-500 text-white";
                    }
                }
                return (
                    <Card key={key} className="hover:scale-105 transition-transform duration-300 from-sidebar-accent to-sidebar-accent/60 gap-0!" childrenClassName="flex flex-col gap-3">
                        <div className="flex justify-between">
                            <span className="text-lg font-bold capitalize">{key}</span>
                            <span className="font-semibold capitalize">{value} μg/m³</span>
                        </div>
                        <Slider min={0} max={max} value={[value]} disabled/>
                        <div className="flex justify-between text-xs">
                            <p className="">0</p>
                            <p className="">{max}</p>
                        </div>
                        <div className="flex justify-between">
                            {Object.keys(pollutant).map((quality) => (
                                <span key={quality[0]} className={clsx("px-2 py-1 rounded-md text-xs font-medium", quality === current() ? qualitycolor() : 'bg-muted text-muted-foreground')}>
                                    {quality}
                                </span>
                            ))}
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}
type AirQualityLevel = "Good" | "Fair" | "Moderate" | "Poor" | "Very Poor";

interface Range {
  min: number;
  max: number;
}

type Pollutant = "SO2" | "NO2" | "PM10" | "PM2.5" | "O3" | "CO";

type AirQualityRanges = Record<Pollutant, Record<AirQualityLevel, Range>>;

const airqual: AirQualityRanges = {
  SO2: {
    Good: { min: 0, max: 20 },
    Fair: { min: 20, max: 80 },
    Moderate: { min: 80, max: 250 },
    Poor: { min: 250, max: 350 },
    "Very Poor": { min: 350, max: Infinity }
  },

  NO2: {
    Good: { min: 0, max: 40 },
    Fair: { min: 40, max: 70 },
    Moderate: { min: 70, max: 150 },
    Poor: { min: 150, max: 200 },
    "Very Poor": { min: 200, max: Infinity }
  },

  PM10: {
    Good: { min: 0, max: 20 },
    Fair: { min: 20, max: 50 },
    Moderate: { min: 50, max: 100 },
    Poor: { min: 100, max: 200 },
    "Very Poor": { min: 200, max: Infinity }
  },

  "PM2.5": {
    Good: { min: 0, max: 10 },
    Fair: { min: 10, max: 25 },
    Moderate: { min: 25, max: 50 },
    Poor: { min: 50, max: 75 },
    "Very Poor": { min: 75, max: Infinity }
  },

  O3: {
    Good: { min: 0, max: 60 },
    Fair: { min: 60, max: 100 },
    Moderate: { min: 100, max: 140 },
    Poor: { min: 140, max: 180 },
    "Very Poor": { min: 180, max: Infinity }
  },

  CO: {
    Good: { min: 0, max: 4400 },
    Fair: { min: 4400, max: 9400 },
    Moderate: { min: 9400, max: 12400 },
    Poor: { min: 12400, max: 15400 },
    "Very Poor": { min: 15400, max: Infinity }
  }
};