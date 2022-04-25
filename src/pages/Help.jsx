import ContentLayout from "../components/layouts/ContentLayout"
import HelpList from "../components/partials/list/HelpList";
import { appLinks } from "../constants/appLinks";
import { useBreads } from '../hooks/useBreads'
import { useEffect } from "react";

const Help = () => {
    const { dispatcher } = useBreads([{ title: appLinks.HELP }]);

    useEffect(() => {
        dispatcher();
        document.title = `ZEON STORE | ${appLinks.HELP}`
    }, []);

    return (
        <ContentLayout>
            <HelpList/>
        </ContentLayout>
    )
}

export default Help