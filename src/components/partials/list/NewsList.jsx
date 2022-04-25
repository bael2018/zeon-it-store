import { setIsFetching } from "../../../store/reducers/newsReducer";
import { news_saga_action } from "../../../store/sagas/newsSaga";
import { useDispatch, useSelector } from "react-redux";
import newImage from "../../../assets/img/newsImage.png";
import ContentLayout from "../../layouts/ContentLayout";
import NewsItem from "../../elements/NewsItem";
import { useEffect } from "react";
import Loader from "../../elements/ui/Loader";
import Description from "../../elements/custom/Description";
import { appLinks } from "../../../constants/appLinks";
import Empty from "../../elements/custom/Empty";

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

    console.log(data);

    function scrollHandler(e) {
        const scrollHeight = e.target.documentElement.scrollHeight;
        const scrollTop = e.target.documentElement.scrollTop;
        const windowHeight = window.innerHeight;

        if (scrollHeight - (scrollTop + windowHeight) < 300) {
            dispatch(setIsFetching({ fetching: true }));
        }
    }

    return (
        <ContentLayout>
            <Description text={appLinks.NEWS} />
            <div>
                {status ? (
                    <Loader />
                ) : data.length ? (
                    data.map((item) => (
                        <NewsItem key={item.id} image={newImage} {...item} />
                    ))
                ) : (
                    <Empty>На данный момент новостей нет!</Empty>
                )}
            </div>
        </ContentLayout>
    );
};

export default NewsList;
