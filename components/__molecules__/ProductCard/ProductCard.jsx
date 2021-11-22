import classNames from 'classnames';
import { useDispatch } from 'react-redux';

import { addToBasket } from '../../../redux/actions';
import { roundCurrency, currencySign } from '../../../api/adapters/prices';

import cssStyles from './x0.module.css';

function ProductCard({ className, product }) {
  const {
    category, name, price, currency, bestseller, image = {},
  } = product;
  const { src, alt } = image;

  const dispatch = useDispatch();

  return (
    <div className={classNames(cssStyles.productCard, className)}>
      <div className={cssStyles.main}>
        <picture className={cssStyles.picture}>
          <img className={classNames(cssStyles.image, cssStyles.picture__image)} alt={alt} src={src} />
        </picture>
        {bestseller && (
        <div className={classNames(cssStyles.productCard__mark, cssStyles.mark)}>Best Seller</div>
        )}
        <button
          type="button"
          className={classNames(cssStyles.productCard__button, cssStyles.addButton)}
          onClick={() => dispatch(addToBasket(product))}
        >
          ADD TO CARD
        </button>
      </div>
      <div className={cssStyles.description}>
        <div className={cssStyles.category}>{category}</div>
        <h3 className={cssStyles.name}>{name}</h3>
        <div className={cssStyles.price}>
          {currencySign(currency)}
          {roundCurrency(price)}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
