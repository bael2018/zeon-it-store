import AppLayout from "./components/layouts/AppLayout";
import { appRoutes } from "./constants/appRoutes";
import { Route, Routes } from "react-router-dom";
import { paths } from "./constants/paths";
import "swiper/css";

const App = () => {
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
