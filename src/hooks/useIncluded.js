export const useIncluded = (array, id, color) => {
    if(color){
        return array.find(item => item.id === id && item.pickedColor === color)
    }else{
        return array.find(item => item.id === id)
    }
}