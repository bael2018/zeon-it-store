import cls from "../../../scss/components/partials/ordermodal.module.scss";
import { regexEmail, regexPhone } from "../../../constants/init";
import CustomInput from "../../elements/custom/CustomInput";
import { useInput } from "../../../hooks/useInput";
import {
    setIsModal,
    setSuccessModal,
} from "../../../store/reducers/modalReducer";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { MdDone } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../constants/paths";
import { useRequest } from "../../../hooks/useRequest";

const OrderModal = () => {
    const [isValid, setIsValid] = useState(false);
    const [offer, setOffer] = useState(false);
    const userCountry = useInput("");
    const userSname = useInput("");
    const userEmail = useInput("");
    const userPhone = useInput("");
    const userName = useInput("");
    const userCity = useInput("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data, error, fetching } = useRequest('post', "userInfo");

    const orderHandler = (e) => {
        e.preventDefault();

        const body = {
            userName: userName.value,
            userSecondName: userSname.value,
            userEmail: userEmail.value,
            userPhone: userPhone.value,
            userCountry: userCountry.value,
            userCity: userCity.value,
        }

        if(data){
            fetching(body)
            dispatch(setSuccessModal(true));
        }
    };

    useEffect(() => {
        if (
            offer &&
            userSname.value &&
            userCountry.value &&
            regexEmail.test(userEmail.value) &&
            regexPhone.test(userPhone.value) &&
            userName.value &&
            userCity.value
        ) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [
        userEmail.value,
        userCity.value,
        userSname.value,
        userCountry.value,
        userPhone.value,
        userName.value,
        offer
    ]);

    const publicOfferHandler = () => {
        navigate(paths.PUBLIC_OFFER);
        dispatch(setIsModal(false));
    };

    return (
        <div className={cls.order}>
            <div className={cls.order__title}>
                <h4>Оформление заказа</h4>
                <span onClick={() => dispatch(setIsModal(false))}>
                    <IoMdClose />
                </span>
            </div>
            <div className={cls.order__form}>
                <form onSubmit={orderHandler} action="address">
                    <CustomInput
                        type="text"
                        title="Ваше имя"
                        placeholder="Например Иван"
                        {...userName.bind()}
                    />
                    <CustomInput
                        type="text"
                        title="Ваше фамилия"
                        placeholder="Например Иванов"
                        {...userSname.bind()}
                    />
                    <CustomInput
                        type="text"
                        title="Электронная почта"
                        placeholder="example@mail.com"
                        {...userEmail.bind()}
                    />
                    <CustomInput
                        phone
                        type="text"
                        title="Ваш номер телефона"
                        placeholder="Введите номер телефона"
                        {...userPhone.bind()}
                    />
                    <CustomInput
                        type="text"
                        title="Страна"
                        placeholder="Введите страну"
                        {...userCountry.bind()}
                    />
                    <CustomInput
                        type="text"
                        title="Город"
                        placeholder="Введите город"
                        {...userCity.bind()}
                    />
                    <div
                        onClick={() => setOffer(!offer)}
                        className={`${cls.allows} ${
                            offer && cls.allows_active
                        }`}
                    >
                        <button>
                            <MdDone />
                        </button>
                        Согласен с условиями
                        <span onClick={publicOfferHandler}>
                            публичной оферты
                        </span>
                    </div>
                    <input
                        className={`${cls.submitBtn} ${
                            isValid && cls.submitBtn_active
                        }`}
                        type="submit"
                    />
                </form>
            </div>
        </div>
    );
};

export default OrderModal;
