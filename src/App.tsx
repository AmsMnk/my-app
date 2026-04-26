import { useState, useEffect } from 'react'
import SearchBox from './components/SearchBox'
import WeatherCard from './components/WeatherCard'
import type { Weather, WeatherResponse, GeocodingResponse } from './types'

function App() {
  const [weather, setWeather] = useState<Weather | null>(null)
  const [city, setCity] = useState('')
  const [cityName, setCityName] = useState('札幌')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchWeather(43.06, 141.35)
  }, [])

  const fetchWeather = (lat: number, lon: number) => {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
      .then(res => res.json())
      .then((data: WeatherResponse) => setWeather(data.current_weather))
  }

  const handleSearch = () => {
    setError('')
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=ja`)
      .then(res => res.json())
      .then((data: GeocodingResponse) => {
        if (!data.results || data.results.length === 0) {
          setError('都市が見つかりませんでした')
          return
        }
        const result = data.results[0]
        setCityName(result.name)
        fetchWeather(result.latitude, result.longitude)
      })
  }

  return (
    <div className="text-center mt-12">
      <h1 className="text-3xl font-bold mb-6">🌤 お天気アプリ</h1>
      <SearchBox city={city} setCity={setCity} onSearch={handleSearch} />
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <div className="mt-8">
        {weather ? (
          <WeatherCard cityName={cityName} weather={weather} />
        ) : (
          <p className="text-gray-500">取得中...</p>
        )}
      </div>
    </div >
  )
}

export default App