import cls from '../../../scss/components/elements/empty.module.scss'

const Empty = ({ children }) => {
    return (
        <div className={cls.empty}>{children}</div>
    )
}

export default Empty