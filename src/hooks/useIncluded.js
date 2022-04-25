export const useIncluded = (array, id) => {
    return array.find(item => item.id === id)
}