import type { Theme } from '../types'

type Props = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const themes: { value: Theme; label: string }[] = [
    { value: 'mode', label: 'Mode' },
    { value: 'cool', label: 'Cool' },
    { value: 'warm', label: 'Warm' },
    { value: 'light', label: 'Light' },
]

function ThemeSwitcher({ theme, setTheme }: Props) {
    return (
        <div className="flex gap-2 justify-center">
            {themes.map((t) => (
                <button
                    key={t.value}
                    onClick={() => setTheme(t.value)}
                    className="px-3 py-1 text-xs tracking-widest uppercase border rounded-none transition"
                    style={{
                        borderColor: 'var(--color-border)',
                        color:
                            theme === t.value
                                ? 'var(--color-text)'
                                : 'var(--color-muted)',
                        opacity: theme === t.value ? 1 : 0.5,
                    }}
                >
                    {t.label}
                </button>
            ))}
        </div>
    )
}

export default ThemeSwitcher
