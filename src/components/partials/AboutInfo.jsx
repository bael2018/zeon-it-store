import cls from "../../scss/components/partials/aboutinfo.module.scss";
import ContentLayout from "../layouts/ContentLayout";
import { appLinks } from "../../constants/appLinks";
import { useRequest } from "../../hooks/useRequest";
import Loader from "../elements/ui/Loader";
import { useEffect } from "react";
import Error from "../../pages/Error";

const AboutInfo = () => {
    const { data, status, error, fetching } = useRequest('get', "app");

    useEffect(() => {
        fetching();
    }, []);

    if(error){
        return <Error status={error}/>
    }else{
        return (
            <ContentLayout>
                {status ? (
                    <Loader />
                ) : (
                    <div className={cls.about}>
                        <div className={cls.about__images}>
                            <div>
                                <img
                                    src={data[0]?.aboutUs.firstImage}
                                    alt="first-pic"
                                />
                                <img
                                    src={data[0]?.aboutUs.secondImage}
                                    alt="third-pic"
                                />
                            </div>
                            <img
                                src={data[0]?.aboutUs.thirdImage}
                                alt="second-pic"
                            />
                        </div>
    
                        <div className={cls.about__text}>
                            <div>
                                <span>{appLinks.ABOUT_US}</span>
                                <p>{data[0]?.aboutUs.text}</p>
                            </div>
                        </div>
                    </div>
                )}
            </ContentLayout>
        );
    }
};

export default AboutInfo;
