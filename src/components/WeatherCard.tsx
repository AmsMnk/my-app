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
        <div className="text-lg space-y-2">
            <p className="text-xl font-bold">{cityName}</p>
            <p>{getWeatherLabel(weather.weathercode)}</p>
            <p>気温：{weather.temperature}℃</p>
            <p>風速：{weather.windspeed} km/h</p>
        </div>
    )
}

export default WeatherCard