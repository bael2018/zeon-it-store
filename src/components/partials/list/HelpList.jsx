import cls from "../../../scss/components/partials/helplist.module.scss";
import { fetch_saga_action } from "../../../store/sagas/fetchSaga";
import Description from "../../elements/custom/Description";
import { appLinks } from "../../../constants/appLinks";
import { useDispatch, useSelector } from "react-redux";
import Empty from "../../elements/custom/Empty";
import HelpItem from "../../elements/HelpItem";
import Loader from "../../elements/ui/Loader";
import { useEffect, useState } from "react";
import Error from "../../../pages/Error";

const HelpList = () => {
    const { data, status, error } = useSelector((state) => state.fetch);
    const [active, setActive] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetch_saga_action({ limit: 5, url: 'help' }));
    }, []);

    if(error){
        return <Error status={error}/>
    }else{
        return (
            <div className={cls.help}>
                {!status && <img src={data.helpImage} alt="картина помощи" />}
    
                <div className={`${cls.help__list} ${status && cls.help__list_load}`}>
                    <Description text={appLinks.HELP} />
    
                    {status ? (
                        <Loader />
                    ) : data.body?.length ? (
                        data.body?.map((help, index) => (
                            <HelpItem
                                active={active}
                                callback={setActive}
                                key={index}
                                {...help}
                            />
                        ))
                    ) : (
                        <Empty>На данный момент ответов нет!</Empty>
                    )}
                </div>
            </div>
        );
    }
};

export default HelpList;
