import { setBreadCrumbs } from "../store/reducers/breadCrumbReducer";
import { useDispatch } from "react-redux";

export const useBreads = (item) => {
    const dispatch = useDispatch();

    return {
        dispatcher: () => dispatch(setBreadCrumbs({ breads: item }))
    };
};