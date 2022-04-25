import { searchFulfilled, setIsSearched } from "../../../store/reducers/searchReducer";
import cls from "../../../scss/components/partials/search.module.scss";
import { search_saga_action } from "../../../store/sagas/searchSaga";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "../../../hooks/useDebounce";
import { useBreads } from "../../../hooks/useBreads";
import { useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";

const SearchNavList = () => {
    const { dispatcher } = useBreads([{ title: "Результаты поиска" }]);
    const { data, status, error } = useSelector((state) => state.search);
    const debouncedCallback = useDebounce(search, 300);
    const [value, setValue] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function search(query) {
        dispatch(search_saga_action(query));
    }

    const onChange = (e) => {
        setValue(e.target.value);
        debouncedCallback(e.target.value);
    };

    const redirectToResult = (name) => {
        if (name !== "") {
            dispatch(searchFulfilled({ data: [] }));
            navigate(`/search/${name}`);
            setValue("");
            dispatcher();
            dispatch(setIsSearched())
        }
    };

    return (
        <div className={cls.search}>
            <input
                type="text"
                value={value}
                onChange={onChange}
                name="search"
                placeholder="Поиск"
            />
            <BiSearch onClick={() => redirectToResult(value)} />
            <div
                className={`${cls.search__result} ${
                    data?.length === 0 && cls.search__result_disabled
                }`}
            >
                <div>
                    {status ? (
                        <h4>Загрузка...</h4>
                    ) : (
                        data?.length !== 0 &&
                        data?.map(({ id, title }) => (
                            <p key={id} onClick={() => redirectToResult(title)}>
                                {title}
                            </p>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchNavList;
