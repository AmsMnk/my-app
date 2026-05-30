import type {
    DailyForecastRaw,
    ForecastDay,
    HourlyForecastRaw,
    HourlyForecast,
} from './types'
import { cities } from './cities'
import type { City } from './cities'
import type { Theme } from './types'

export const parseDailyForecast = (raw: DailyForecastRaw): ForecastDay[] => {
    return raw.time.map((date, i) => ({
        date,
        weathercode: raw.weathercode[i],
        maxTemp: raw.temperature_2m_max[i],
        minTemp: raw.temperature_2m_min[i],
    }))
}

export const parseHourlyForecast = (
    raw: HourlyForecastRaw,
): HourlyForecast[] => {
    const currentHour = new Date().getHours()
    const all = raw.time.map((time, i) => ({
        time,
        temperature: raw.temperature_2m[i],
        weathercode: raw.weathercode[i],
    }))
    return all.slice(currentHour, currentHour + 24)
}

export const searchCities = (input: string): City[] => {
    if (!input) return []
    const lower = input.toLowerCase()
    return cities.filter(
        (city) =>
            city.name.includes(input) ||
            city.reading.includes(input) ||
            city.query.toLowerCase().includes(lower),
    )
}

export const isValidTheme = (value: string | null): value is Theme => {
    return (
        value === 'mode' ||
        value === 'cool' ||
        value === 'warm' ||
        value === 'light'
    )
}
