export const mathProducts = (arr) => {
    const result = arr.reduce((prev, item) => {
        return prev.includes(item.collection) ? prev : [...prev, item.collection]
    }, [])

    const res = result.map(el => {
        return arr.filter(item => item.collection === el)
    })

    const elem = []

    for(let i = 0; i < res.length; i++){
        elem.push(res[i][0])
    }

    return elem.slice(0,5)
}