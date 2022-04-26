import cls from "../scss/components/partials/error.module.scss";
import { useBreads } from "../hooks/useBreads";
import { useNavigate } from "react-router-dom";
import { paths } from "../constants/paths";

const Error = ({ status }) => {
    const { dispatcher } = useBreads([]);
    const navigate = useNavigate();

    const btnHandler = () => {
        dispatcher();
        navigate(paths.MAIN);
    };

    return (
        <div className={cls.error}>
            <h4>Произошла ошибка | cтатус ошибки {status}</h4>
            <p>
                Вернуться на <span onClick={btnHandler}>главную</span>
            </p>    
        </div>
    );
};

export default Error;
