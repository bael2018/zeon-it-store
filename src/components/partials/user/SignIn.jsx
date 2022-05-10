import cls from "../../../scss/components/partials/auth.module.scss";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setAuthUser } from "../../../store/reducers/userReducer";
import CustomInput from "../../elements/custom/CustomInput";
import Description from "../../elements/custom/Description";
import { useBreads } from "../../../hooks/useBreads";
import { regexEmail } from "../../../constants/init";
import { useInput } from "../../../hooks/useInput";
import { paths } from "../../../constants/paths";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const SignIn = ({ setAuth }) => {
    const [isValid, setValid] = useState(false);
    const [isEmail, setIsEmail] = useState("");
    const { dispatcher } = useBreads([]);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userEmail = useInput("");
    const userPassword = useInput("");

    const formHandler = (e) => {
        e.preventDefault();

        const auth = getAuth();

        signInWithEmailAndPassword(auth, userEmail.value, userPassword.value)
        .then(({ user }) => {
            dispatch(setAuthUser({ auth: true }));
            localStorage.setItem("uid", JSON.stringify(user.uid));
            navigate(paths.MAIN);
            dispatcher()

            userEmail.clearValue()
            userPassword.clearValue()
        })
        .catch((res) =>
            alert("Пользователь с таким email не найден!")
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
            <Description text="Войдите в свой аккаунт." />
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
                    Еще нет аккаунта?{" "}
                    <span onClick={() => setAuth((prev) => !prev)}>
                        Регистрация
                    </span>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
