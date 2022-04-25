import cls from "../../../scss/components/elements/modal.module.scss";
import CallbackPhone from "../../partials/modals/CallbackPhone";
import SuccessInfo from "../../partials/modals/SuccessInfo";
import OrderModal from "../../partials/modals/OrderModal";
import { useSelector } from "react-redux";

const Modal = () => {
    const { isModal, successModal, initModal } = useSelector(
        (state) => state.modal
    );

    return (
        <div className={`${cls.modal} ${isModal && cls.modal_active}`}>
            <div className={cls.modal__wrapper}>
                {successModal ? (
                    <SuccessInfo />
                ) : !initModal ? (
                    <CallbackPhone />
                ) : (
                    <OrderModal />
                )}
            </div>
        </div>
    );
};

export default Modal;
