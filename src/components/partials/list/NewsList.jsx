import { setIsFetching } from "../../../store/reducers/newsReducer";
import { news_saga_action } from "../../../store/sagas/newsSaga";
import Description from "../../elements/custom/Description";
import ContentLayout from "../../layouts/ContentLayout";
import { appLinks } from "../../../constants/appLinks";
import { useDispatch, useSelector } from "react-redux";
import Empty from "../../elements/custom/Empty";
import NewsItem from "../../elements/NewsItem";
import Loader from "../../elements/ui/Loader";
import Error from "../../../pages/Error";
import { useEffect } from "react";

const NewsList = () => {
    const { data, status, error, isFetching } = useSelector(
        (state) => state.news
    );
    const dispatch = useDispatch();

    useEffect(() => {
        if (isFetching) {
            dispatch(news_saga_action());
        }
    }, [isFetching]);

    useEffect(() => {
        document.addEventListener("scroll", scrollHandler);

        return function () {
            document.removeEventListener("scroll", scrollHandler);
        };
    }, []);

    function scrollHandler(e) {
        const scrollHeight = e.target.documentElement.scrollHeight;
        const scrollTop = e.target.documentElement.scrollTop;
        const windowHeight = window.innerHeight;

        if (scrollHeight - (scrollTop + windowHeight) < 300) {
            dispatch(setIsFetching({ fetching: true }));
        }
    }

    if(error){
        return <Error status={error}/>
    }else{
        return (
            <ContentLayout>
                <Description text={appLinks.NEWS} />
                <div>
                    {status ? (
                        <Loader />
                    ) : data.length ? (
                        data.map((item) => (
                            <NewsItem key={item.id} {...item} />
                        ))
                    ) : (
                        <Empty>На данный момент новостей нет!</Empty>
                    )}
                </div>
            </ContentLayout>
        );
    }
};

export default NewsList;
