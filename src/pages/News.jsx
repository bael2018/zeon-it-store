import NewsList from "../components/partials/list/NewsList";
import { appLinks } from "../constants/appLinks";
import { useBreads } from "../hooks/useBreads";
import { useEffect } from "react";

const News = () => {
    const { dispatcher } = useBreads([{ title: appLinks.NEWS }]);

    useEffect(() => {
        dispatcher();
        document.title = `ZEON STORE | ${appLinks.NEWS}`
    }, []);

    return <NewsList/>
}

export default News