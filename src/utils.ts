import type { DailyForecastRaw, ForecastDay } from './types'
import { cities } from './cities'
import type { City } from './cities'

export const parseDailyForecast = (raw: DailyForecastRaw): ForecastDay[] => {
    return raw.time.map((date, i) => ({
        date,
        weathercode: raw.weathercode[i],
        maxTemp: raw.temperature_2m_max[i],
        minTemp: raw.temperature_2m_min[i],
    }))
}

export const searchCities = (input: string): City[] => {
    if (!input) return []
    const lower = input.toLowerCase()
    return cities.filter(city =>
        city.name.includes(input) ||
        city.reading.includes(input) ||
        city.query.toLowerCase().includes(lower)
    )
}