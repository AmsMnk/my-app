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
        <div className="mt-8">
            <h2 className="test-lg font-bold mb-4">週間予報</h2>
            <div className="flex justify-center gap-2 flex-wrap">
                {daily.slice(0, 5).map(day => (
                    <div key={day.date} className="border rounded p-3 w-24">
                        <p className="text-sm">{formatDate(day.date)}</p>
                        <p className="text-2xl my-2">{getWeatherLabel(day.weathercode)}</p>
                        <p className="text-xs">
                            <span className="text-red-500">{day.maxTemp}°</span>
                            {' / '}
                            <span className="text-blue-500">{day.minTemp}°</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ForecastList