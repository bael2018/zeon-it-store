import MainCarousel from "../components/partials/carosel/MainCarousel";
import ContentLayout from "../components/layouts/ContentLayout";
import Bestseller from "../components/partials/Bestseller";
import Benefits from "../components/partials/Benefits";
import { appLinks } from "../constants/appLinks";
import { useEffect } from "react";
import NewArrivals from "../components/partials/NewArrivals";
import Collection from "../components/partials/Collection";
import { useBreads } from "../hooks/useBreads";

const Main = () => {
    const { dispatcher } = useBreads([]);

    useEffect(() => {
        dispatcher();
        document.title = appLinks.MAIN;
    }, []);

    return (
        <ContentLayout>
            <MainCarousel/>
            <Bestseller/>
            <NewArrivals/>
            <Collection/>
            <Benefits/>
        </ContentLayout>
    );
};

export default Main;
