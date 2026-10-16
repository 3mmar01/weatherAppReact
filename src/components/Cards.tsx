import type { CityData } from "../types/CityData";
import type { currentWeather } from "../types/WeatherData";
import { X } from 'lucide-react'
import { useEffect, useState, useCallback } from "react";
import GetWeather from "../utils/GetWeather";
import { getWeatherDescription } from "../utils/GetWeatherDescription";

const REFRESH_INTERVAL_MS = 30_000; // 30 seconds

interface CardsProps {
    cities: CityData[]
    onRemoveCity: (id: number) => void
}

type WeatherCardProps = {
    city: CityData
    onRemoveCity: (id: number) => void
}

function WeatherCard({ city, onRemoveCity }: WeatherCardProps) {
    const [weather, setWeather] = useState<currentWeather | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    const fetchWeather = useCallback(() => {
        GetWeather({ latitude: city.latitude, longitude: city.longitude })
            .then(data => {
                setWeather(data.current_weather);
                setLastUpdated(new Date());
            });
    }, [city.latitude, city.longitude]);

    // Initial fetch + auto-refresh every 30s
    useEffect(() => {
        fetchWeather();
        const interval = setInterval(fetchWeather, REFRESH_INTERVAL_MS);
        return () => clearInterval(interval);
    }, [fetchWeather]);

    const weatherDesc = weather ? getWeatherDescription(weather.weathercode) : null;

    const formattedTime = lastUpdated
        ? lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        : null;

    return (
        <div className="group relative bg-gray-800 text-yellow-500 p-5 rounded-xl flex flex-col
                        transition-all duration-300 ease-in-out
                        hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/10 hover:ring-2 hover:ring-yellow-500/40 cursor-default">
            {/* Card header */}
            <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl font-bold">{city.name}</h2>
                <button
                    onClick={() => onRemoveCity(city.id)}
                    className="opacity-0 group-hover:opacity-100
                               text-red-500 hover:text-white hover:bg-red-500
                               rounded-full p-1
                               transition-all duration-200 ease-in-out"
                    aria-label={`Remove ${city.name}`}
                >
                    <X size={16} />
                </button>
            </div>
            <p className="text-sm text-gray-400 mb-3">{city.country}</p>

            {/* Loading state */}
            {!weather && (
                <p className="text-sm text-gray-400 animate-pulse">Loading weather...</p>
            )}

            {/* Weather data */}
            {weather && weatherDesc && (
                <div className="flex flex-col gap-1 mt-1 flex-1">
                    <div className="flex items-center gap-2 text-3xl font-bold">
                        <span>{weatherDesc.emoji}</span>
                        <span>{Math.round(weather.temperature)}°C</span>
                    </div>
                    <p className="text-sm text-gray-300">{weatherDesc.label}</p>
                    <div className="flex gap-4 text-sm text-gray-400 mt-2">
                        <span>💨 {weather.windspeed} km/h</span>
                        <span>🧭 {weather.winddirection}°</span>
                    </div>
                </div>
            )}

            {/* Last updated timestamp */}
            {formattedTime && (
                <p className="mt-4 text-xs text-gray-600 border-t border-gray-700 pt-2">
                    Updated {formattedTime}
                </p>
            )}
        </div>
    );
}

export default function Cards({ cities, onRemoveCity }: CardsProps) {
    return (
        <div className="w-full max-w-6xl mx-auto px-4 mt-6">
            {cities.length === 0 ? (
                <div className="flex justify-center text-yellow-500 text-xl font-bold mt-8">No cities added yet.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cities.map((city) => (
                        <WeatherCard key={city.id} city={city} onRemoveCity={onRemoveCity} />
                    ))}
                </div>
            )}
        </div>
    );
}