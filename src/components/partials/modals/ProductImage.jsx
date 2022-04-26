import cls from '../../../scss/components/partials/modal/productimage.module.scss'
import { setIsModal } from "../../../store/reducers/modalReducer"
import { useDispatch, useSelector } from "react-redux"
import { IoMdClose } from 'react-icons/io'

const ProductImage = () => {
    const { zoomImage } = useSelector(state => state.product)
    const dispatch = useDispatch()

    return (
        <div className={cls.zoom}>
            <span onClick={() => dispatch(setIsModal(false))}><IoMdClose /></span>
            <div>
                <img src={zoomImage} alt="картинка товара" />
            </div>
        </div>
    )
}

export default ProductImage