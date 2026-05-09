import type { ForecastDay } from '../types'

type Props = {
    daily: ForecastDay[]
}

const getWeatherLabel = (code: number) => {
    if (code === 0) return '☀️'
    if (code <= 2) return '🌤'
    if (code <= 48) return '☁️'
    if (code <= 67) return '🌧'
    if (code <= 77) return '🌨'
    return '⛈'
}

const formatDate = (dareStr: string) => {
    const date = new Date(dareStr)
    const month = date.getMonth() + 1
    const day = date.getDate()
    const weekdays = ['日', '月', '火', '水', '木', '金', '土']
    return `${month}/${day}(${weekdays[date.getDay()]})`
}

function ForecastList({ daily }: Props) {
    return (
        <div className="mt-12 max-w-3xl mx-auto">
            <p className="text-xs tracking-widest uppercase mb-4 text-center" style={{ color: 'var(--color-muted)' }}>
                5 Days Forecast
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
                {daily.slice(0, 5).map(day => (
                    <div
                        key={day.date}
                        className="rounded-xl p-4 w-24 border"
                        style={{
                            backgroundColor: 'var(--color-card)',
                            borderColor: 'var(--color-border)',
                        }}
                    >
                        <p className="text-xs mb-3" style={{ color: 'var(--color-muted)' }}>
                            {formatDate(day.date)}
                        </p>
                        <p className="text-3xl my-2">{getWeatherLabel(day.weathercode)}</p>
                        <p className="text-xs font-mono mt-3 space-y-1">
                            <span className="block text-rose-500 opacity-70">{day.maxTemp.toFixed(1)}°</span>
                            <span className="block text-sky-500 opacity-70">{day.minTemp.toFixed(1)}°</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ForecastList