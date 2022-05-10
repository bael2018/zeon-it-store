import AuthWrapper from "../components/partials/user/AuthWrapper";
import ContentLayout from "../components/layouts/ContentLayout"
import { appLinks } from "../constants/appLinks";
import { useBreads } from "../hooks/useBreads";
import { useEffect } from "react";

const Auth = () => {
    const { dispatcher } = useBreads([{ title: appLinks.AUTH }]);

    useEffect(() => {
        dispatcher();
        document.title = `ZEON STORE | ${appLinks.AUTH}`;
    }, []);

    return (
        <ContentLayout>
            <AuthWrapper/>
        </ContentLayout>
    )
}

export default Auth