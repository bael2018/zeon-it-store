import cls from '../../scss/components/elements/loadbtn.module.scss'

const LoadBtn = ({ loadData }) => {
    return (
        <div className={cls.loadBtn}>
            <button onClick={loadData}>Еще</button>
        </div>
    )
}

export default LoadBtn