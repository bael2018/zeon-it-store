import cls from '../../../scss/components/partials/dynamiclist.module.scss'
import Description from "../../elements/custom/Description";
import Empty from "../../elements/custom/Empty";
import Loader from "../../elements/ui/Loader";
import { memo } from 'react';

const DynamicList = ({ empty, description, params, element }) => {
    const { data, status, error } = params;

    return (
        <div className={cls.dynamic}>
            <Description text={description} />

            <div className={cls.dynamic__list}>
                {status ? (
                    <Loader />
                ) : data.length ? (
                    data.map((item) => element(item))
                ) : (
                    <Empty>{empty}</Empty>
                )}
            </div>
        </div>
    );
};

export default memo(DynamicList);
