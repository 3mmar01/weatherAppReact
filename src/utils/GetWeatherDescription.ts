export function getWeatherDescription(code: number): { emoji: string; label: string } {
    if (code === 0) return { emoji: "☀️", label: "Clear sky" };
    if (code <= 2) return { emoji: "⛅", label: "Partly cloudy" };
    if (code === 3) return { emoji: "☁️", label: "Overcast" };
    if (code <= 49) return { emoji: "🌫️", label: "Foggy" };
    if (code <= 59) return { emoji: "🌦️", label: "Drizzle" };
    if (code <= 69) return { emoji: "🌧️", label: "Rain" };
    if (code <= 79) return { emoji: "❄️", label: "Snow" };
    if (code <= 84) return { emoji: "🌧️", label: "Rain showers" };
    if (code <= 94) return { emoji: "⛈️", label: "Thunderstorm" };
    return { emoji: "⛈️", label: "Thunderstorm" };
}