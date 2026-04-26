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