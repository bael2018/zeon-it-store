export const mathTotalPrice = (arr, price) => {
    return arr.reduce((prev, item) => {
        return prev + +item[price] * +item.count;
    }, 0);
};

export const mathTotalCount = (arr) => {
    return arr.reduce((prev, item) => {
        return prev + item.count
    }, 0)
}

export const totalPrice = (carts) => {
    return (
        mathTotalPrice(carts, "currentPrice").toString()
    );
};

export const totalDiscountPrice = (carts) => {
    return (
        mathTotalPrice(carts, "discount").toString()
    );  
};