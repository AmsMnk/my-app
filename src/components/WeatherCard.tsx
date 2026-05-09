import type { Weather } from '../types'

type Props = {
    cityName: string
    weather: Weather
}

const getWeatherLabel = (code: number) => {
    if (code === 0) return '☀️ 快晴'
    if (code <= 2) return '🌤 晴れ'
    if (code <= 48) return '☁️ 曇り'
    if (code <= 67) return '🌧 雨'
    if (code <= 77) return '🌨 雪'
    return '⛈ 荒天'
}

function WeatherCard({ cityName, weather }: Props) {
    return (
        <div
            className="max-w-sm mx-auto p-8 rounded-2xl border"
            style={{
                backgroundColor: 'var(--color-card)',
                borderColor: 'var(--color-border)',
            }}
        >
            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--color-muted)' }}>
                Current Weather
            </p>
            <p className="text-2xl font-light mb-6">{cityName}</p>
            <p className="text-5xl font-extralight font-mono mb-6">
                {weather.temperature.toFixed(1)}°
            </p>
            <div className="space-y-1 text-sm" style={{ color: 'var(--color-muted)' }}>
                <p>{getWeatherLabel(weather.weathercode)}</p>
                <p className="font-mono">Wind {weather.windspeed.toFixed(1)} km/h</p>
            </div>
        </div>
    )
}

export default WeatherCard