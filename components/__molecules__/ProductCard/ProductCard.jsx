import cssStyles from './x0.module.css';
import classNames from "classnames";
import { useDispatch } from "react-redux";

import { addToBasket } from "../../../redux/actions";

const ProductCard = ({ className, category, name, price, currency, isBestseller, isFeatured, image = {} }) => {
    const {src, alt} = image;

    const dispatch = useDispatch();

    return (
        <div className={classNames(cssStyles.productCard, className)}>
            <div className={cssStyles.main}>
                <picture className={cssStyles.picture}>
                    <img className={classNames(cssStyles.image, cssStyles.picture__image)} alt={alt} src={src} />
                </picture>
                {isBestseller && (
                    <div className={classNames(cssStyles.productCard__mark, cssStyles.mark)}>Best Seller</div>
                )}
                <button
                    type="button"
                    className={classNames(cssStyles.productCard__button, cssStyles.addButton)}
                    onClick={() => dispatch(addToBasket(name))}
                >
                    ADD TO CARD
                </button>
            </div>
            <div className={cssStyles.description}>
                <div className={cssStyles.category}>{category}</div>
                <h3 className={cssStyles.name}>{name}</h3>
                <div>{currency}{price}</div>
            </div>
        </div>
    )
}

export default ProductCard;