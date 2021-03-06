import cls from "../../../scss/components/elements/breadcrumb.module.scss";
import { appLinks } from "../../../constants/appLinks";
import { useBreads } from "../../../hooks/useBreads";
import { paths } from "../../../constants/paths";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const BreadCrumb = () => {
    const { breads } = useSelector((state) => state.breads);
    const { dispatcher } = useBreads([]);
    const navigate = useNavigate();

    const pushHandler = (path) => {
        if (path === paths.MAIN) {
            dispatcher();
        }
        navigate(path);
    };

    if(breads.length){
        return (
            <div className={cls.bread}>
                <div className={cls.bread__wrapper}>
                    <ul>
                        <li onClick={() => pushHandler(paths.MAIN)}>
                            {appLinks.MAIN}
                        </li>
                        {breads?.map(({ url, title }) => {
                            if (!url) {
                                return (
                                    <li
                                        className={cls.bread__wrapper_active}
                                        key={title}
                                    >
                                        <span>/</span> {title}
                                    </li>
                                );
                            } else {
                                return (
                                    <li key={title} onClick={() => pushHandler(url)}>
                                        <span>/</span> {title}
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </div>
            </div>
        );
    }
};

export default BreadCrumb;
