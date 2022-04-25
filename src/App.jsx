import AppLayout from "./components/layouts/AppLayout";
import { Route, Routes } from "react-router-dom";
import { appRoutes } from "./constants/appRoutes";
import "swiper/css";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                {appRoutes.map((route) => (
                    <Route key={route.id} {...route} />
                ))}
            </Route>
        </Routes>
    );
};

export default App;
