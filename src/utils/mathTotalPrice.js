export const mathTotalPrice = (arr, price) => {
    return arr.reduce((prev, item) => {
        return prev + +item[price] * +item.count;
    }, 0);
};

export const totalPrice = (carts) => {
    return (
        mathTotalPrice(carts, "currentPrice")
    );
};

export const totalDiscountPrice = (carts) => {
    return (
        mathTotalPrice(carts, "discount")
    );  
};