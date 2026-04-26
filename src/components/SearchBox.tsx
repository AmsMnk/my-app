
type Props = {
    city: string
    setCity: (value: string) => void
    onSearch: () => void
}

function SearchBox({ city, setCity, onSearch }: Props) {
    return (
        <>
            <input
                type="text"
                placeholder="都市名を入力"
                value={city}
                onChange={e => setCity(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && onSearch()}
                className="border px-3 py-2 text-base rounded"
            />
            <button
                onClick={onSearch}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                検索
            </button>
        </>
    )
}

export default SearchBox