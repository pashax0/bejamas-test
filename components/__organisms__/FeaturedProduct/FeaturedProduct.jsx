import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import cssStyles from './x0.module.css';

import { addToBasket } from '../../../redux/actions';

function FeaturedProduct({
  className, product,
}) {
  const DEFAULT_IMAGE_WIDTH = 1290;
  const DEFAULT_IMAGE_HEIGHT = 852;

  const {
    category, name, details = {}, image = {},
  } = product;
  const { src, alt } = image;

  const dispatch = useDispatch();

  const {
    description, dimensions, size, recommendations,
  } = details;

  return (
    <div className={classNames(cssStyles.featuredProduct, className)}>
      <div className={cssStyles.main}>
        <header className={cssStyles.main__header}>
          <h1>{name}</h1>
        </header>
        <button
          type="button"
          className={classNames(cssStyles.main__addButton, cssStyles.addButton)}
          onClick={() => dispatch(addToBasket(product))}
        >
          ADD TO CARD
        </button>
        <div className={classNames(cssStyles.bannerBlock)}>
          <picture>
            <img
              className={classNames(cssStyles.image)}
              alt={alt}
              src={src}
              width={DEFAULT_IMAGE_WIDTH}
              height={DEFAULT_IMAGE_HEIGHT}
            />
          </picture>
          <div className={classNames(cssStyles.bannerBlock__flag, cssStyles.flag)}>
            Photo of the day
          </div>
        </div>
      </div>
      <div className={cssStyles.description}>
        <div className={classNames(cssStyles.description__about, cssStyles.about)}>
          <h3 className={cssStyles.description__title}>
            About the
            {name}
          </h3>
          <h4 className={cssStyles.description__category}>{category}</h4>
          <p className={cssStyles.text_color_grey}>{description}</p>
        </div>
        <div className={classNames(cssStyles.description__details, cssStyles.details)}>
          <div>
            <h3 className={cssStyles.description__title}>People also buy</h3>
            <ul className={cssStyles.recommendations}>
              {recommendations.map((recommendedImage, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={i} className={cssStyles.recommendations__item}>
                  {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                  <a href="/">
                    <img
                      className={cssStyles.recommendations__image}
                      src={recommendedImage.src}
                      alt={recommendedImage.alt}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={cssStyles.description__title}>Details</h3>
            <div className={cssStyles.text_color_grey}>{`Size: ${dimensions.width} x ${dimensions.height} pixel`}</div>
            <div className={cssStyles.text_color_grey}>{`Size: ${size / 1000} mb`}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedProduct;
