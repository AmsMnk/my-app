import { useState, useEffect } from 'react'

const getWeatherLabel = (code: number) => {
  if (code === 0) return '☀️ 快晴'
  if (code <= 2) return '🌤 晴れ'
  if (code <= 48) return '☁️ 曇り'
  if (code <= 67) return '🌧 雨'
  if (code <= 77) return '🌨 雪'
  return '⛈ 荒天'
}

function App() {
  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState('')
  const [cityName, setCityName] = useState('札幌')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchWeather(43.06, 141.35)
  }, [])

  const fetchWeather = (lat: number, lon: number) => {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
      .then(res => res.json())
      .then(data => setWeather(data.current_weather))
  }

  const handleSearch = () => {
    setError('')
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=ja`)
      .then(res => res.json())
      .then(data => {
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
      <input
        type="text"
        placeholder="都市名を入力"
        value={city}
        onChange={e => setCity(e.target.value)}
        className="border px-3 py-2 text-base rounded"
      />
      <button
        onClick={handleSearch}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        検索
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <div className="mt-8">
        {weather ? (
          <div className="text-lg space-y-2">
            <p className="text-xl font-bold">{cityName}</p>
            <p>{getWeatherLabel(weather.weathercode)}</p>
            <p>気温：{weather.temperature}℃</p>
            <p>風速：{weather.windspeed} km/h</p>
          </div>
        ) : (
          <p className="text-gray-500">取得中...</p>
        )}
      </div>
    </div>
  )
}

export default App