import AboutInfo from "../components/partials/AboutInfo";
import { appLinks } from "../constants/appLinks";
import { useBreads } from "../hooks/useBreads";
import { useEffect } from "react";

const AboutUs = () => {
    const { dispatcher } = useBreads([{ title: appLinks.ABOUT_US }]);

    useEffect(() => {
        dispatcher();
        document.title = `ZEON STORE | ${appLinks.ABOUT_US}`
    }, []);

    return <AboutInfo />;
};

export default AboutUs;
