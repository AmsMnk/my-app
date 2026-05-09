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
                placeholder="Search City"
                value={city}
                onChange={e => handleChange(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        setSuggestions([])
                        onSearch()
                    }
                }}
                className="px-4 py-2 text-sm tracking-wider bg-transparent border rounded-none focus:outline-none"
                style={{
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text)',
                }}
            />
            <button
                onClick={() => {
                    setSuggestions([])
                    onSearch()
                }}
                className="ml-2 px-5 py-2 text-xs tracking-widest uppercase border rounded-none hover:opacity-70 transition"
                style={{
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text)',
                }}
            >
                Search
            </button>
            {suggestions.length > 0 && (
                <ul
                    className="absolute left-0 top-full mt-1 border w-48 text-left z-10"
                    style={{
                        backgroundColor: 'var(--color-card)',
                        borderColor: 'var(--color-border)',
                    }}
                >
                    {suggestions.map(s => (
                        <li
                            key={s.query}
                            onClick={() => handleSelect(s)}
                            className="px-3 py-2 text-sm cursor-pointer hover:opacity-70 transition"
                        >
                            {s.name}<span className="ml-2 text-xs" style={{ color: 'var(--color-muted)' }}>{s.reading}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default SearchBox