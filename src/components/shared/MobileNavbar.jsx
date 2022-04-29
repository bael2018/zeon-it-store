import { setIsVisible } from "../../store/reducers/searchReducer";
import cls from "../../scss/components/mobilenavbar.module.scss";
import { setSidebar } from "../../store/reducers/modalReducer";
import SearchNavList from "../partials/list/SearchNavList";
import { useDispatch, useSelector } from "react-redux";
import { navbar_target } from "../../constants/init";
import { useRequest } from "../../hooks/useRequest";
import { useBreads } from "../../hooks/useBreads";
import { useNavigate } from "react-router-dom";
import { paths } from "../../constants/paths";
import { IoMdClose } from "react-icons/io";
import { GoSearch } from "react-icons/go";
import { useEffect } from "react";

const MobileNavbar = () => {
    const { dispatcher } = useBreads([]);
    const { isVisible } = useSelector((state) => state.search);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, fetching } = useRequest("get", "app");

    useEffect(() => {
        fetching();
    }, []);

    const navLogoHandler = () => {
        dispatcher();
        navigate(paths.MAIN);
    };

    return (
        <div id={navbar_target} className={cls.mobilenav}>
            <div
                onClick={() => dispatch(setSidebar())}
                className={cls.mobilenav__bars}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div onClick={navLogoHandler} className={cls.mobilenav__logo}>
                <img src={data[0]?.appLogo} alt="лого" />
            </div>
            <div
                onClick={() => dispatch(setIsVisible())}
                className={cls.mobilenav__search}
            >
                {isVisible ? <IoMdClose /> : <GoSearch />}
            </div>
            <div
                className={`${cls.searchModal} ${
                    isVisible && cls.searchModal_active
                }`}
            >
                <SearchNavList />
            </div>
        </div>
    );
};

export default MobileNavbar;
