export type Weather = {
    temperature: number
    windspeed: number
    winddirection: number
    weathercode: number
    is_day: number
    time: string
}

export type WeatherResponse = {
    current_weather: Weather
}

export type GeocodingResult = {
    name: string
    latitude: number
    longitude: number
}

export type GeocodingResponse = {
    results?: GeocodingResult[]
}

export type DailyForecastRaw = {
    time: string[]
    weathercode: number[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
}

export type ForecastDay = {
    date: string
    weathercode: number
    maxTemp: number
    minTemp: number
}

export type ForecastResponse = {
    current_weather: Weather
    daily: DailyForecastRaw
}

export type Status = 'loading' | 'success' | 'error'