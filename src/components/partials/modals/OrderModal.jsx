import cls from "../../../scss/components/partials/ordermodal.module.scss";
import { clearCartProduct, setCartToggle } from "../../../store/reducers/cartReducer";
import {
    API_URL,
    FIREBASE_URL,
    regexEmail,
    regexPhone,
} from "../../../constants/init";
import CustomInput from "../../elements/custom/CustomInput";
import { useInput } from "../../../hooks/useInput";
import { useRequest } from "../../../hooks/useRequest";
import { paths } from "../../../constants/paths";
import { useNavigate } from "react-router-dom";
import {
    setIsModal,
    setSuccessModal,
} from "../../../store/reducers/modalReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdDone } from "react-icons/md";

const OrderModal = () => {
    const { isAuth } = useSelector((state) => state.user);
    const { cartToggle } = useSelector((state) => state.cart);
    const uid = JSON.parse(localStorage.getItem("uid"));
    const [isValid, setIsValid] = useState(false);
    const [offer, setOffer] = useState(false);
    const [isNumber, setIsNumber] = useState("");
    const [isEmail, setIsEmail] = useState("");

    const userCountry = useInput("");
    const userSname = useInput("");
    const userEmail = useInput("");
    const userPhone = useInput("");
    const userName = useInput("");
    const userCity = useInput("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, fetching } = useRequest("post", `${FIREBASE_URL}users/${uid}/info.json`);
    const { fetching: delteFetching } = useRequest("delete", `${FIREBASE_URL}users/${uid}/carts.json`);
    const { data, fetching: cartsFetching } = useRequest("get", `${FIREBASE_URL}users/${uid}/carts.json`);
    const { fetching: apiFetching } = useRequest(
        "post",
        `${FIREBASE_URL}users/${uid}/orders.json`
    );

    useEffect(() => {
        cartsFetching()
    }, [cartToggle])

    const orderHandler = async (e) => {
        e.preventDefault();

        if (isNumber === "valid" && isEmail === "valid" && isValid) {
            const body = {
                userName: userName.value,
                userSecondName: userSname.value,
                userEmail: userEmail.value,
                userPhone: userPhone.value,
                userCountry: userCountry.value,
                userCity: userCity.value,
            };

            if (error) {
                alert(`Произошла ошибка статус ${error}`);
            } else {
                if (isAuth) {
                    await fetching(body);
                    await apiFetching(data)
                    await delteFetching()
                    dispatch(setSuccessModal(true));
                    dispatch(setCartToggle())
                    setIsEmail("invalid");
                    setIsNumber("invalid");
                }
                dispatch(setSuccessModal(true));
                setIsEmail("invalid");
                setIsNumber("invalid");
                dispatch(clearCartProduct());
            }
        }
    };

    useEffect(() => {
        if (
            offer &&
            userSname.value &&
            userCountry.value &&
            userEmail.value &&
            userPhone.value &&
            userName.value &&
            userCity.value
        ) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }

        if (isValid) {
            if (regexEmail.test(userEmail.value)) {
                setIsEmail("valid");
            } else {
                setIsEmail("invalid");
            }

            if (regexPhone.test(userPhone.value)) {
                setIsNumber("valid");
            } else {
                setIsNumber("invalid");
            }
        }
    }, [
        userEmail.value,
        userCity.value,
        userSname.value,
        userCountry.value,
        userPhone.value,
        userName.value,
        offer,
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
                        isOk={isEmail}
                        title="Электронная почта"
                        placeholder="example@mail.com"
                        {...userEmail.bind()}
                    />
                    <CustomInput
                        phone
                        type="text"
                        isOk={isNumber}
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
