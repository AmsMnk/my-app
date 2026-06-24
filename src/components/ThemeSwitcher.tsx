import { Spade, Moon, Coffee, Snowflake } from 'lucide-react'
import type { Theme } from '../types'

type Props = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const themes: { value: Theme; label: string; Icon: typeof Spade }[] = [
    { value: 'mode', label: 'Mode', Icon: Spade },
    { value: 'cool', label: 'Cool', Icon: Moon },
    { value: 'warm', label: 'Warm', Icon: Coffee },
    { value: 'light', label: 'Light', Icon: Snowflake },
]

function ThemeSwitcher({ theme, setTheme }: Props) {
    return (
        <div className="flex gap-2 justify-center">
            {themes.map((t) => (
                <button
                    key={t.value}
                    onClick={() => setTheme(t.value)}
                    aria-label={t.label}
                    className="p-2 border rounded-full transition hover:opacity-100"
                    style={{
                        borderColor: 'var(--color-border)',
                        color:
                            theme === t.value
                                ? 'var(--color-text)'
                                : 'var(--color-muted)',
                        opacity: theme === t.value ? 1 : 0.5,
                    }}
                >
                    <t.Icon size={16} />
                </button>
            ))}
        </div>
    )
}

export default ThemeSwitcher
