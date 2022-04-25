import RedirectContent from "../components/partials/RedirectContent";
import { appLinks } from "../constants/appLinks";
import { useBreads } from "../hooks/useBreads";
import { useEffect } from "react";
import ContentLayout from "../components/layouts/ContentLayout";

const Redirect = () => {
    const { dispatcher } = useBreads([{ title: appLinks.REDIRECT }]);

    useEffect(() => {
        dispatcher();
        document.title = `ZEON STORE | ${appLinks.REDIRECT}`
    }, []);

    return (
        <ContentLayout>
            <RedirectContent/>
        </ContentLayout>
    );
};

export default Redirect;
