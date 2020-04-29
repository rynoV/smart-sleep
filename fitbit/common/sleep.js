export function sleep(ms, callback=() => {}) {
    return new Promise((resolve) => {
        setTimeout(async () => {
            await callback()
            resolve()
        }, ms)
    })
}
