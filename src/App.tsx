import { useState, useEffect } from 'react'
import SearchBox from './components/SearchBox'
import WeatherCard from './components/WeatherCard'
import Spinner from './components/Spinner'
import ForecastList from './components/ForecastList'
import HourlyForecastList from './components/HourlyForecast'
import { parseDailyForecast, parseHourlyForecast } from './utils'
import { cities } from './cities'
import type {
    Weather,
    ForecastResponse,
    GeocodingResponse,
    Status,
    ForecastDay,
    HourlyForecast,
} from './types'

function App() {
    const [weather, setWeather] = useState<Weather | null>(null)
    const [daily, setDaily] = useState<ForecastDay[] | null>(null)
    const [hourly, setHourly] = useState<HourlyForecast[] | null>(null)
    const [city, setCity] = useState('')
    const [cityName, setCityName] = useState('札幌')
    const [status, setStatus] = useState<Status>('loading')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        const saved = localStorage.getItem('lastCity')
        if (saved) {
            const { lat, lon, name } = JSON.parse(saved)
            setCityName(name)
            fetchWeather(lat, lon)
        } else {
            fetchWeather(43.06, 141.35)
        }
    }, [])

    const fetchWeather = (lat: number, lon: number) => {
        setStatus('loading')
        fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weathercode&timezone=Asia/Tokyo`,
        )
            .then((res) => res.json())
            .then((data: ForecastResponse) => {
                setWeather(data.current_weather)
                setDaily(parseDailyForecast(data.daily))
                setHourly(parseHourlyForecast(data.hourly))
                setStatus('success')
            })
            .catch(() => {
                setStatus('error')
                setErrorMessage('Failed to fetch weather data')
            })
    }

    const handleSearch = (queryOverride?: string) => {
        let searchQuery = queryOverride ?? city
        if (!searchQuery) return

        // 辞書にマッチする都市があればローマ字に変換
        if (!queryOverride) {
            const matched = cities.find(
                (c) => c.name === searchQuery || c.reading === searchQuery,
            )
            if (matched) searchQuery = matched.query
        }

        setErrorMessage('')
        fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery}&count=1&language=ja`,
        )
            .then((res) => res.json())
            .then((data: GeocodingResponse) => {
                if (!data.results || data.results.length === 0) {
                    setStatus('error')
                    setErrorMessage('City not found')
                    return
                }
                const result = data.results[0]
                setCityName(result.name)
                localStorage.setItem(
                    'lastCity',
                    JSON.stringify({
                        name: result.name,
                        lat: result.latitude,
                        lon: result.longitude,
                    }),
                )
                fetchWeather(result.latitude, result.longitude)
            })
    }

    return (
        <div className="min-h-screen flex justify-center px-6 py-20">
            <div className="w-full max-w-4xl text-center">
                <div className="mb-12">
                    <h1
                        className="text-xs tracking-[0.3em] uppercase font-light"
                        style={{ color: 'var(--color-muted)' }}
                    >
                        Weather
                    </h1>
                    <p className="text-3xl font-extralight mt-2">天気予報</p>
                </div>

                <div className="mb-12">
                    <SearchBox
                        city={city}
                        setCity={setCity}
                        onSearch={handleSearch}
                    />
                </div>

                {status === 'error' && (
                    <p className="text-xs tracking-widest uppercase mt-6 text-rose-500 opacity-70">
                        {errorMessage}
                    </p>
                )}

                <div className="mt-8">
                    {status === 'loading' && (
                        <>
                            <p
                                className="text-xs tracking-widest uppercase mb-4"
                                style={{ color: 'var(--color-muted)' }}
                            >
                                Loading
                            </p>
                            <Spinner />
                        </>
                    )}
                    {status === 'success' && weather && (
                        <>
                            <WeatherCard
                                cityName={cityName}
                                weather={weather}
                            />
                            {hourly && <HourlyForecastList hourly={hourly} />}
                            {daily && <ForecastList daily={daily} />}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default App
