import cls from "../../scss/components/partials/redirect.module.scss";
import { useBreads } from "../../hooks/useBreads";
import { useNavigate } from "react-router-dom";
import { paths } from "../../constants/paths";

const RedirectContent = () => {
    const { dispatcher } = useBreads([]);
    const navigate = useNavigate();

    const redirectHandler = () => {
        dispatcher();
        navigate(paths.MAIN);
    };

    return (
        <div className={cls.redirect}>
            <h4>Такой страницы не существует !</h4>
            <p>
                Вернуться на{" "}
                <span onClick={redirectHandler}>
                    главную страницу
                </span>{" "}
            </p>
        </div>
    );
};

export default RedirectContent;
