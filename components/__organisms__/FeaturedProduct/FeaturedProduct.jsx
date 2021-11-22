import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import cssStyles from './x0.module.css';

import { addToBasket } from '../../../redux/actions';

function FeaturedProduct({
  className, category, name, price, currency, details = {}, image = {},
}) {
  const { src, alt } = image;
  const dispatch = useDispatch();

  const { description, dimensions, size } = details;

  return (
    <div className={classNames(cssStyles.featuredProduct, className)}>
      <header className={cssStyles.header}>
        <h1>{name}</h1>
        <button
          type="button"
          className={classNames(cssStyles.addButton)}
          onClick={() => dispatch(addToBasket(name))}
        >
          ADD TO CARD
        </button>
      </header>
      <div className={classNames(cssStyles.bannerBlock)}>
        <picture>
          <img className={classNames(cssStyles.image)} alt={alt} src={src} />
        </picture>
        <div className={classNames(cssStyles.bannerBlock__flag, cssStyles.flag)}>
          Photo of the day
        </div>
      </div>
      <div className={cssStyles.description}>
        <div className={cssStyles.about}>
          <h3 className={cssStyles.description__title}>
            About the
            {name}
          </h3>
          <p>{description}</p>
        </div>
        <div className={cssStyles.details}>
          <h3 className={cssStyles.description__title}>People also buy</h3>
          <h3 className={cssStyles.description__title}>Details</h3>
          <div>{`Size: ${dimensions.width} x ${dimensions.height} pixel`}</div>
          <div>{`Size: ${size / 1000} mb`}</div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedProduct;
