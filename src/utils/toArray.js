export const toArray = el => {
    if(!el) return []

    return Object.entries(el).map(item => {
        const pid = item[0]

        return {
            ...item[1],
            pid
        }
    })
}