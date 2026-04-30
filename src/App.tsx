import { useState, useEffect } from 'react'
import SearchBox from './components/SearchBox'
import WeatherCard from './components/WeatherCard'
import Spinner from './components/Spinner'
import ForecastList from './components/ForecastList'
import { parseDailyForecast } from './utils'
import type { Weather, ForecastResponse, GeocodingResponse, Status, ForecastDay } from './types'

function App() {
  const [weather, setWeather] = useState<Weather | null>(null)
  const [daily, setDaily] = useState<ForecastDay[] | null>(null)
  const [city, setCity] = useState('')
  const [cityName, setCityName] = useState('札幌')
  const [status, setStatus] = useState<Status>('loading')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    fetchWeather(43.06, 141.35)
  }, [])

  const fetchWeather = (lat: number, lon: number) => {
    setStatus('loading')
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia/Tokyo`).then(res => res.json())
      .then((data: ForecastResponse) => {
        setWeather(data.current_weather)
        setDaily(parseDailyForecast(data.daily))
        setStatus('success')
      })
      .catch(() => {
        setStatus('error')
        setErrorMessage('天気情報の取得に失敗しました')
      })
  }

  const handleSearch = () => {
    setErrorMessage('')
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=ja`)
      .then(res => res.json())
      .then((data: GeocodingResponse) => {
        if (!data.results || data.results.length === 0) {
          setStatus('error')
          setErrorMessage('都市が見つかりませんでした')
          return
        }
        const result = data.results[0]
        setCityName(result.name)
        fetchWeather(result.latitude, result.longitude)
      })
  }

  return (
    <div className="text-center mt-12">
      <h1 className="text-3xl font-bold mb-6" >🌤 お天気アプリ</h1>
      <SearchBox city={city} setCity={setCity} onSearch={handleSearch} />
      {status === 'error' && <p className="text-red-500 mt-4">{errorMessage}</p>}
      <div className="mt-8">
        {status === 'loading' &&
          <>
            <p className="text-gray-500">取得中...</p>
            <Spinner />
          </>
        }
        {status === 'success' && weather && (
          <>
            <WeatherCard cityName={cityName} weather={weather} />
            {daily && <ForecastList daily={daily} />}
          </>
        )}
      </div>
    </div>
  )
}

export default App