import PublicOfferList from '../components/partials/list/PublicOfferList';
import ContentLayout from '../components/layouts/ContentLayout'
import { appLinks } from '../constants/appLinks';
import { useBreads } from '../hooks/useBreads';
import { useEffect } from 'react'

const PublicOffer = () => {
    const { dispatcher } = useBreads([{ title: appLinks.PUBLIC_OFFER }]);

    useEffect(() => {
        dispatcher()
        document.title = `ZEON STORE | ${appLinks.PUBLIC_OFFER}`
    }, [])

    return (
        <ContentLayout>
            <PublicOfferList/>
        </ContentLayout>
    )
}

export default PublicOffer