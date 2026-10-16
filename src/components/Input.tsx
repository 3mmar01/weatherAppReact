import { useState, useRef } from 'react'
import type {CityData, CityApiResponse} from '../types/CityData'
import GetWeather from '../utils/GetWeather'

type InputProps = {
    onAddCity: (city: CityData) => void
}

export default function Input({ onAddCity }: InputProps) {

    const [results, setResults] = useState<CityData[]>([]);
    const inputRef = useRef<HTMLInputElement>(null)

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;

        const fetchCityData = async () => {
            const cityName = query;
            if (query.length < 3) {
                setResults([]);
                return;
            }
            try {
                const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=5&language=en&format=json`);
                const data: CityApiResponse = await response.json();
                
                setResults(data.results || []);
                console.log("Results:", data.results);
            } catch (error) {
                console.error('Error fetching city data:', error);
            }
        };
        fetchCityData();
    };

    function handleAddCity(selectedCity: CityData) {
        onAddCity(selectedCity);
        setResults([]);
        GetWeather(selectedCity);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    return(
        <div className="mx-auto w-full max-w-6xl">
            <div className="flex min-h-20 w-full items-center justify-center text-3xl font-bold text-yellow-500">
                <input onChange={handleSearch} ref={inputRef} type="text" placeholder="Enter city name" aria-label="Enter city name" className="w-full max-w-md bg-gray-800 p-3 text-base text-yellow-500 placeholder:text-gray-400 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors duration-300 ease-in-out sm:text-lg" />
            </div>
            <div className="mt-4 flex w-full flex-col items-center px-1">
                {results.map((result) => (
                    <button type="button" key={result.id} className="mb-2 w-full max-w-md rounded-md bg-gray-800 p-3 text-center text-yellow-500 hover:bg-yellow-500 hover:text-gray-900 cursor-pointer transition-colors duration-300 ease-in-out" onClick={() => handleAddCity(result)}>
                        {result.name}, {result.country}
                    </button>
                ))}
            </div>
        </div>
    )
}