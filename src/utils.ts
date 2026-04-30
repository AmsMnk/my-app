import type { DailyForecastRaw, ForecastDay } from './types'

export const parseDailyForecast = (raw: DailyForecastRaw): ForecastDay[] => {
    return raw.time.map((date, i) => ({
        date,
        weathercode: raw.weathercode[i],
        maxTemp: raw.temperature_2m_max[i],
        minTemp: raw.temperature_2m_min[i],
    }))
}