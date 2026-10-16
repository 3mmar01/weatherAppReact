import type { WeatherData } from "../types/WeatherData";

export default async function GetWeather(city: { latitude: number; longitude: number }): Promise<WeatherData> {
    const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`
    );
    const data: WeatherData = await response.json();
    return data;
}
