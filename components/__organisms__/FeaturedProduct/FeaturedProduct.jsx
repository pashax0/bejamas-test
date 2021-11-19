import cssStyles from './x0.module.css';
import classNames from "classnames";
import {useDispatch} from "react-redux";

import {addToBasket} from "../../../redux/actions";

const FeaturedProduct = ({ className, category, name, price, currency, details = {}, image = {} }) => {
    const {src, alt} = image;
    const dispatch = useDispatch();

    const { description, dimensions, size } = details;

    return (
        <div className={classNames(cssStyles.featuredProduct, className)}>
            <header className={cssStyles.header}>
                <h2>{name}</h2>
                <button
                    type="button"
                        className={classNames(cssStyles.addButton)}
                    onClick={() => dispatch(addToBasket(name))}
                >
                    ADD TO CARD
                </button>
            </header>
            <div className={cssStyles.banner}>
                <picture>
                    <img className={classNames(cssStyles.image)} alt={alt} src={src} />
                </picture>
                <div className={classNames(cssStyles.banner__flag, cssStyles.flag)}>
                    Photo of the day
                </div>
            </div>
            <div className={cssStyles.details}>
                <div className={cssStyles.description}>
                    <h4 className={cssStyles.details__title}>About the {name}</h4>
                    <p>{description}</p>
                </div>
                <div>
                    <h5 className={cssStyles.details__title}>People also buy</h5>
                    <h5 className={cssStyles.details__title}>Details</h5>
                    <div>{`Size: ${dimensions.width} x ${dimensions.height} pixel`}</div>
                    <div>{`Size: ${size / 1000} mb`}</div>
                </div>
            </div>
        </div>
    )
}

export default FeaturedProduct;