import { useNavigate } from "react-router-dom";
import { paths } from "../../constants/paths";
import cls from "../../scss/components/partials/redirect.module.scss";

const RedirectContent = () => {
    const navigate = useNavigate();

    return (
        <div className={cls.redirect}>
            <h4>Такой страницы не существует !</h4>
            <p>
                Вернуться на{" "}
                <span onClick={() => navigate(paths.MAIN)}>
                    главную страницу
                </span>{" "}
            </p>
        </div>
    );
};

export default RedirectContent;
