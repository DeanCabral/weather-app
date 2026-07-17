import type { Dispatch, SetStateAction } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type Props = {
  mapType: string;
  setMapType: Dispatch<SetStateAction<string>>;
};

export default function MapTypeDropdown({ mapType, setMapType }: Props) {
  return (
    <Select value={mapType.split('_')[0].charAt(0).toUpperCase() + mapType.split('_')[0].slice(1)} onValueChange={(value) => value && setMapType(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="" />
      </SelectTrigger>
        <SelectContent>
            {mapTypes.map((mapType) => (
                <SelectItem key={mapType} value={mapType} className="capitalize">
                    {mapType.split('_')[0]}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>


  )
}

const mapTypes = [
  "clouds_new",
  "precipitation_new",
  "pressure_new",
  "wind_new",
  "temp_new"
]