import cls from '../../../scss/components/elements/description.module.scss'

const Description = ({ text }) => {
    return (
        <h4 className={cls.description}>{text}</h4>
    )
}

export default Description