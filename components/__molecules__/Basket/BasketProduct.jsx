import { currencySign, roundCurrency } from '../../../api/adapters/prices';

import cssStyles from './x0.module.css';

export default function BasketProduct({ product }) {
  const {
    name, price, currency, image = {},
  } = product;
  const { src, alt } = image;

  return (
    <div className={cssStyles.basketProduct}>
      <div>
        <div className={cssStyles.name}>{name}</div>
        <div className={cssStyles.price}>
          {currencySign(currency)}
          {roundCurrency(price)}
        </div>
      </div>
      <picture className={cssStyles.basketProduct__picture}>
        <img className={cssStyles.basketProduct__image} src={src} alt={alt} />
      </picture>
    </div>
  );
}
