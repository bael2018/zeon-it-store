import { setIsModal, setSuccessModal } from "../../../store/reducers/modalReducer";
import cls from "../../../scss/components/partials/successinfo.module.scss";
import vector from "../../../assets/img/vector-zeon.png";
import { paths } from "../../../constants/paths";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const SuccessInfo = () => {
    const navigate = useNavigate('')
    const dispatch = useDispatch()

    const closeHandler = () => {
        dispatch(setIsModal(false))
        setTimeout(() => {
            dispatch(setSuccessModal(false))
            navigate(paths.MAIN)
        }, 300);
    }

    return (
        <div className={cls.success}>
            <img src={vector} alt="иконка галочки" />
            <h4>Спасибо !</h4>
            <p>Ваша заявка была принята ожидайте, скоро Вам перезвонят</p>
            <button onClick={closeHandler}>Продолжить покупки</button>
        </div>
    );
};

export default SuccessInfo;
