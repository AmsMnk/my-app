import { useState, useEffect } from 'react'

type Props = {
    onFinish: () => void
}

const SUBTITLE = '天気予報'

function Splash({ onFinish }: Props) {
    const [typed, setTyped] = useState('')
    const [fadeOut, setFadeOut] = useState(false)

    // タイピング処理
    useEffect(() => {
        if (typed.length < SUBTITLE.length) {
            const timer = setTimeout(() => {
                setTyped(SUBTITLE.slice(0, typed.length + 1))
            }, 200)
            return () => clearTimeout(timer)
        }
    }, [typed])

    // タイピング完了後にフェードアウト
    useEffect(() => {
        if (typed === SUBTITLE) {
            const timer = setTimeout(() => setFadeOut(true), 1500)
            return () => clearTimeout(timer)
        }
    }, [typed])

    // フェードアウト完了後に終了通知
    useEffect(() => {
        if (fadeOut) {
            const timer = setTimeout(onFinish, 1500)
            return () => clearTimeout(timer)
        }
    }, [fadeOut, onFinish])

    return (
        <div
            className="fixed inset-0 flex flex-col items-center justify-center z-50"
            style={{
                backgroundColor: '#0a0a0a',
                opacity: fadeOut ? 0 : 1,
                pointerEvents: fadeOut ? 'none' : 'auto',
                transition: 'opacity 1.5s ease-in-out',
            }}
        >
            <h1
                className="text-xs tracking-[0.3em] uppercase font-light splash-fadein"
                style={{ color: 'var(--color-muted)' }}
            >
                Weather
            </h1>
            <p className="text-3xl font-extralight mt-2 font-mono">
                {typed}
                <span className="splash-cursor">|</span>
            </p>
        </div>
    )
}

export default Splash
