import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import cls from "../../../scss/components/partials/auth.module.scss";
import { setAuthUser } from "../../../store/reducers/userReducer";
import CustomInput from "../../elements/custom/CustomInput";
import Description from "../../elements/custom/Description";
import { regexEmail } from "../../../constants/init";
import { useBreads } from "../../../hooks/useBreads";
import { useInput } from "../../../hooks/useInput";
import { paths } from "../../../constants/paths";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SignUp = ({ setAuth }) => {
    const { carts } = useSelector((state) => state.cart);
    const [isEmail, setIsEmail] = useState("");
    const [isValid, setValid] = useState(false);
    const { dispatcher } = useBreads([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userEmail = useInput("");
    const userPassword = useInput("");

    const formHandler = (e) => {
        e.preventDefault();

        const auth = getAuth();

        createUserWithEmailAndPassword(
            auth,
            userEmail.value,
            userPassword.value
        )
            .then(({ user }) => {
                fetch(`https://zeon-it-hub-default-rtdb.asia-southeast1.firebasedatabase.app/users/${user.uid}/carts.json`, 
                {
                    method: "POST",
                    body: JSON.stringify(...carts),
                })

                dispatch(setAuthUser({ auth: true }));
                localStorage.setItem("uid", JSON.stringify(user.uid));
                navigate(paths.MAIN);
                dispatcher()

                userEmail.clearValue()
                userPassword.clearValue()
            })
            .catch((res) =>
                alert("Пользователь с таким email уже существует!")
            );
    };

    useEffect(() => {
        if (regexEmail.test(userEmail.value)) {
            setIsEmail("valid");
        } else {
            setIsEmail("invalid");
        }

        if (regexEmail.test(userEmail.value) && userPassword.value.length > 7) {
            setValid(true);
        } else {
            setValid(false);
        }
    }, [userEmail.value, userPassword.value]);

    return (
        <div className={cls.auth}>
            <Description text="Зарегистрируйте свой аккаунт." />
            <div>
                <form onSubmit={formHandler} action="address">
                    <CustomInput
                        type="text"
                        isOk={isEmail}
                        title="Электронная почта"
                        placeholder="example@mail.com"
                        {...userEmail.bind()}
                    />
                    <CustomInput
                        type="password"
                        title="Пароль"
                        placeholder="password1234"
                        {...userPassword.bind()}
                    />
                    <input
                        className={`${cls.auth_btn} ${
                            isValid && cls.auth_btn_active
                        }`}
                        type="submit"
                    />
                </form>
                <p>
                    Уже есть аккаунт?{" "}
                    <span onClick={() => setAuth((prev) => !prev)}>Войти</span>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
