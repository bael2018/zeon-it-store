import { setIsModal, setSuccessModal } from "../../../store/reducers/modalReducer";
import cls from "../../../scss/components/partials/callbackphone.module.scss";
import userImage from "../../../assets/img/user-outlined.png";
import userNumber from "../../../assets/img/telephone.png";
import { useRequest } from "../../../hooks/useRequest";
import { regexPhone } from "../../../constants/init";
import { useInput } from "../../../hooks/useInput";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";

const CallbackPhone = () => {
    const [valid, setValid] = useState(true);
    const userName = useInput("");
    const userPhone = useInput("");
    const dispatch = useDispatch()

    const { data, error, fetching } = useRequest('post', "userInfo");

    const formHandler = (e) => {
        e.preventDefault();

        const body = {
            userName: userName.value,
            userPhone: userPhone.value
        }
        
        fetching(body)
        if(data){
            dispatch(setSuccessModal(true));
            userName.clearValue();
            userPhone.clearValue();
        }
    };

    useEffect(() => {
        if (regexPhone.test(userPhone.value) && userName.value) {
            setValid(false);
        } else {
            setValid(true);
        }
    }, [userPhone.value, userName.value]);

    const closeHandler = () => {
        dispatch(setIsModal(false));
        userName.clearValue();
        userPhone.clearValue();
    };

    return (
        <div className={cls.phone}>
            <span className={cls.phone__closer} onClick={closeHandler}>
                <IoMdClose />
            </span>
            <h4>Если у Вас остались вопросы</h4>
            <p>Отставьте заявку и мы обязательно Вам перезвоним</p>

            <form onSubmit={formHandler} action="address">
                <div>
                    <img src={userImage} alt="иконка пользователя" />
                    <input
                        required
                        {...userName.bind()}
                        placeholder="Как к Вам обращаться?"
                        name="name"
                        type="text"
                    />
                </div>
                <div>
                    <img src={userNumber} alt="иконка телефона" />
                    <input
                        required
                        {...userPhone.bind()}
                        placeholder="Номер телефона"
                        name="phone"
                        type="text"
                    />
                </div>
                <input
                    className={`${valid && cls.disabled}`}
                    type="submit"
                    value="Заказать звонок"
                />
            </form>
        </div>
    );
};

export default CallbackPhone;
