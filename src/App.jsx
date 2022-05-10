import { setAuthUser } from "./store/reducers/userReducer";
import AppLayout from "./components/layouts/AppLayout";
import { appRoutes } from "./constants/appRoutes";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { paths } from "./constants/paths";
import { useEffect } from "react";
import "swiper/css";

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        if(localStorage.getItem('uid')){
            dispatch(setAuthUser({ auth: true }));
        }
    }, [])

    return (
        <Routes>
            <Route path={paths.MAIN} element={<AppLayout />}>
                {appRoutes.map((route) => (
                    <Route key={route.id} {...route} />
                ))}
            </Route>
        </Routes>
    );
};

export default App;
