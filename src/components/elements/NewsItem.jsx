import cls from '../../scss/components/elements/newsitem.module.scss'

const NewsItem = ({ title, content, image }) => {
    return (
        <div className={cls.news}>
            <img src={image} alt="картина новости" />
            <div>
                <h5>{title}</h5>
                <p>{content}</p>
            </div>
        </div>
    )
}

export default NewsItem