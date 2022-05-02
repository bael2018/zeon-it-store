import FixedMessage from "../partials/FixedMessage";
import MobileNavbar from "../shared/MobileNavbar";
import { lazy, Suspense, useEffect } from "react";
import Modal from "../elements/custom/Modal";
import Loader from "../elements/ui/Loader";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../shared/Sidebar";
import Navbar from "../shared/Navbar";
import "../../scss/style.scss";

const Footer = lazy(() => import("../shared/Footer"));

const AppLayout = () => {
    const { isVisible } = useSelector((state) => state.search);

    useEffect(() => {
        if (isVisible) {
            window.document.body.style.overflow = "hidden";
        } else {
            window.document.body.style.overflowY = "scroll";
            window.document.body.style.overflowX = "hidden";
        }
    }, [isVisible])

    return (
        <div className="root">
            {window.innerWidth < 900 && <MobileNavbar/>}
            <Navbar />
            <Sidebar/>
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
