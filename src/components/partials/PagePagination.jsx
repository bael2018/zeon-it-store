import cls from "../../scss/components/partials/pagepagination.module.scss";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
    pageEndDecrement,
    pageEndIncrement,
    pageStartDecrement,
    pageStartIncrement,
    setPageEnd,
    setPageStart,
} from "../../store/reducers/paginationReducer";
import { memo, useEffect } from "react";

const PagePagination = ({ query }) => {
    const { pageStart, pageEnd } = useSelector((state) => state.pagination);
    const { totalCount } = useSelector((state) => state.product);
    const { pageHandler, limit, page } = query();
    const dispatch = useDispatch();

    const pagesCount = Math.ceil(totalCount / limit);
    const pagesData = [];

    for (let i = 0; i < pagesCount; i++) {
        pagesData.push(i);
    }

    const paginateDecrement = () => {
        if (page > 1) {
            if (pagesData.length > 4 && pageStart > 0) {
                dispatch(pageStartDecrement());
                dispatch(pageEndDecrement());
            }
            pageHandler((prev) => prev - 1);
        }
    };

    const paginateIncrement = () => {
        if (page < pagesCount) {
            if (pageEnd < pagesData.length) {
                dispatch(pageStartIncrement());
                dispatch(pageEndIncrement());
            }
            pageHandler((prev) => prev + 1);
        }
    };

    const paginateElements = (count) => (
        <span
            onClick={() => pageHandler(count + 1)}
            key={count}
            className={`${page === count + 1 && cls.pagination_active}`}
        >
            {count + 1}
        </span>
    );

    useEffect(() => {
        if(page === pagesData.length){
            dispatch(setPageStart(pagesData.length - 4))
            dispatch(setPageEnd(pagesData.length))
        }
    }, [page])

    return (
        <div className={cls.pagination}>
            <span className={cls.pagination__arrow} onClick={paginateDecrement}>
                <AiOutlineLeft />
            </span>
            {pagesData.length > 4 ? (
                <div>
                    {pagesData
                        .slice(pageStart, pageEnd)
                        .map((count) => paginateElements(count))}
                    {pagesData.length - pageEnd + 1 > 1 && (
                        <div>
                            <span
                                style={{
                                    display:
                                        pagesData.length - pageEnd > 1
                                            ? "block"
                                            : "none",
                                }}
                            >
                                ...
                            </span>
                            <span
                                className={`${
                                    page === pagesData.length &&
                                    cls.pagination_active
                                }`}
                                onClick={() => pageHandler(pagesData.length)}
                            >
                                {pagesData.length}
                            </span>
                        </div>
                    )}
                </div>
            ) : (
                pagesData.map((count) => paginateElements(count))
            )}
            <span className={cls.pagination__arrow} onClick={paginateIncrement}>
                <AiOutlineRight />
            </span>
        </div>
    );
};

export default memo(PagePagination);
