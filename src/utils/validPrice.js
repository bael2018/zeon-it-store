export const validPrice = (str) => {
    const el = str?.split("");

    if (el?.length === 4) {
        el.splice(1, 1, ` ${el[el?.length - 3]}`);
    } else if (el?.length === 5) {
        el.splice(2, 1, ` ${el[el?.length - 4]}`);
    } else if (el?.length === 6) {
        el.splice(3, 1, ` ${el[el?.length - 5]}`);
    }else if (el?.length === 7){
        el.splice(1, 1, ` ${el[el?.length - 6]}`);
        el.splice(4, 1, ` ${el[el?.length - 3]}`);
    }

    return el?.join("");
};
