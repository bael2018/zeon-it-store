import cls from "../../../scss/components/partials/publicoffer.module.scss";
import Description from "../../elements/custom/Description";
import { useRequest } from "../../../hooks/useRequest";
import Loader from "../../elements/ui/Loader";
import { useEffect } from "react";
import Error from "../../../pages/Error";

const PublicOfferList = () => {
    const { data, status, error, fetching } = useRequest("get", "publicOffer");

    useEffect(() => {
        fetching();
    }, []);

    if(error){
        return <Error status={error}/>
    }else{
        return (
            <div className={cls.public}>
                {status ? (
                    <Loader />
                ) : (
                    <>
                        <Description text={data?.title} />
                        <div className={cls.public__wrapper}>
                            {data?.content?.map(({ body, id }) => (
                                <p key={id}>{body}</p>
                            ))}
                        </div>
                    </>
                )}
            </div>
        );
    }
};

export default PublicOfferList;
