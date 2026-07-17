import type { Dispatch, SetStateAction } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type Props = {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
};

export default function LocationDropdown({ location, setLocation }: Props) {
  return (
    <Select value={location} onValueChange={(value) => value && setLocation(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="" />
      </SelectTrigger>
        <SelectContent>
            {locations.map((city) => (
                <SelectItem key={city} value={city}>
                    {city}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>


  )
}

const locations = [
  "New York",
  "London",
  "Paris",
  "Tokyo",
  "Dubai",
  "Singapore",
  "Sydney",
  "Rome",
  "Barcelona",
  "Hong Kong"
]