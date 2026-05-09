import { useState } from "react"
import { searchCities } from "../utils"
import type { City } from "../cities"

type Props = {
    city: string
    setCity: (value: string) => void
    onSearch: (query?: string) => void
}

function SearchBox({ city, setCity, onSearch }: Props) {
    const [suggestions, setSuggestions] = useState<City[]>([])

    const handleChange = (value: string) => {
        setCity(value)
        setSuggestions(searchCities(value))
    }

    const handleSelect = (selected: City) => {
        setCity(selected.name)
        setSuggestions([])
        onSearch(selected.query)
    }

    return (
        <div className="relative inline-block">
            <input
                type="text"
                placeholder="都市名を入力"
                value={city}
                onChange={e => handleChange(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        setSuggestions([])
                        onSearch()
                    }
                }}
                className="border px-3 py-2 text-base rounded"
            />
            <button
                onClick={() => {
                    setSuggestions([])
                    onSearch()
                }}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                検索
            </button>
            {suggestions.length > 0 && (
                <ul className="absolute left-0 top-full mt-1 bg-white border rounded shadow w-48 text-left z-10">
                    {suggestions.map(s => (
                        <li
                            key={s.query}
                            onClick={() => handleSelect(s)}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                            {s.name} ({s.reading})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default SearchBox