import FixedMessage from "../partials/FixedMessage";
import Modal from "../elements/custom/Modal";
import Loader from "../elements/ui/Loader";
import { Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "../shared/Navbar";
import "../../scss/style.scss";

const Footer = lazy(() => import("../shared/Footer"));

const AppLayout = () => {
    return (
        <div className="root">
            <Navbar />
            <FixedMessage />
            <Modal/>
            <div className="container">
                <div className="container__wrapper">
                    <Outlet />
                </div>
            </div>
            <Suspense fallback={<Loader />}>
                <Footer />
            </Suspense>
        </div>
    );
};

export default AppLayout;
