import cls from '../../scss/components/elements/benefititem.module.scss'

const BenefitItem = ({ title, content, icon }) => {
    return (
        <div className={cls.benefitItem}>
            <img src={icon} alt="картина преимущества" />
            <div>
                <h5>{title}</h5>
                <p>{content}</p>
            </div>
        </div>
    )
}

export default BenefitItem