function Spinner() {
    return (
        <div className="flex justify-center">
            <div
                className="animate-spin h-6 w-6 border rounded-full"
                style={{
                    borderColor: 'var(--color-border)',
                    borderTopColor: 'var(--color-text)',
                }}
            ></div>
        </div>
    )
}

export default Spinner