import { appLinks } from "../constants/appLinks";
import { useBreads } from "../hooks/useBreads";
import { useEffect } from "react";
import ContentLayout from "../components/layouts/ContentLayout";
import CollectionsList from "../components/partials/list/CollectionsList";

const Collections = () => {
    const { dispatcher } = useBreads([{ title: appLinks.COLLECTIONS }]);

    useEffect(() => {
        dispatcher();
        document.title = `ZEON STORE | ${appLinks.COLLECTIONS}`;
    }, []);

    return (
        <ContentLayout>
            <CollectionsList />
        </ContentLayout>
    );
};

export default Collections;
