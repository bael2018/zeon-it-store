import cls from '../../scss/components/elements/orderitem.module.scss'

const OrderItem = ({ data }) => {
    const {
        title,
        sizeRage,
        pickedColor,
        currentPrice,
        productImages,
        count,
    } = data;

    return (
        <div className={cls.orderitem}>
            <div className={cls.orderitem__image}>
                <img src={productImages[0].image} alt="картинка товара" />
            </div>
            <div className={cls.orderitem__content}>
                <h3>{title}</h3>
                <p>Размер: {sizeRage}</p>
                <p>Цвет: <span style={{background: pickedColor}}></span></p>
                <p>Цена: {currentPrice}</p>
                <p>Количество: {count}</p>
            </div>
        </div>
    )
}

export default OrderItem