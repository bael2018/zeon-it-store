import cls from "../../scss/components/contentlayout.module.scss";

const ContentLayout = ({ children }) => {
    return <div className={cls.content}>{children}</div>;
};

export default ContentLayout;
