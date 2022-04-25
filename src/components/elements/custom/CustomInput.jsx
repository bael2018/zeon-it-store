import cls from "../../../scss/components/elements/custominput.module.scss";
import { AiOutlineCaretDown } from "react-icons/ai";
import flag from "../../../assets/img/flag.png";

const CustomInput = ({
    placeholder,
    title,
    type,
    value,
    onChange,
    phone = false,
}) => {
    return (
        <div className={cls.input}>
            <span>{title}</span>
            <div className={`${phone && cls.input__wrapper}`}>
                {phone && (
                    <span>
                        <img src={flag} alt="флаг" /> +996{" "}
                        <AiOutlineCaretDown />
                    </span>
                )}

                <input
                    required
                    placeholder={placeholder}
                    type={type}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    );
};

export default CustomInput;
