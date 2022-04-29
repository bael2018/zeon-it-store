import cls from '../../scss/components/partials/collectionslist.module.scss'

const ProductWrapper = ({ children }) => {
    return (
        <div className={`${cls.collections} ${cls.collections_between}`}>
            {children}
        </div>
    )
}

export default ProductWrapper