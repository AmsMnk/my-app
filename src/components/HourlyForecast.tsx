import type { HourlyForecast } from '../types'

type Props = {
    hourly: HourlyForecast[]
}

const getWeatherLabel = (code: number) => {
    if (code === 0) return '☀️'
    if (code <= 2) return '🌤'
    if (code <= 48) return '☁️'
    if (code <= 67) return '🌧'
    if (code <= 77) return '🌨'
    return '⛈'
}

const formatHour = (timeStr: string) => {
    const date = new Date(timeStr)
    return `${date.getHours()}:00`
}

function HourlyForecastList({ hourly }: Props) {
    return (
        <div className="mt-12 max-w-3xl mx-auto">
            <p
                className="text-xs tracking-widest uppercase mb-4 text-center"
                style={{ color: 'var(--color-muted)' }}
            >
                24 Hours Forecast
            </p>
            <div className="overflow-x-auto">
                <div className="flex gap-3 pb-2">
                    {hourly.map((h) => (
                        <div
                            key={h.time}
                            className="rounded-xl p-3 border flex-shrink-0 w-20 text-center"
                            style={{
                                backgroundColor: 'var(--color-card)',
                                borderColor: 'var(--color-border)',
                            }}
                        >
                            <p
                                className="text-xs mb-2 font-mono"
                                style={{ color: 'var(--color-muted)' }}
                            >
                                {formatHour(h.time)}
                            </p>
                            <p className="text-2xl my-1">
                                {getWeatherLabel(h.weathercode)}
                            </p>
                            <p className="text-xs font-mono mt-2">
                                {h.temperature.toFixed(1)}°
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HourlyForecastList
