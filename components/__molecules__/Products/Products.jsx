import classNames from 'classnames';

import ProductCard from '../ProductCard';

import cssStyles from './x0.module.css';

const Products = function ({ className, products }) {
  return (
    <ul className={classNames(cssStyles.productList, className)}>
      {products.map((product) => (
        <li key={product} className={classNames(cssStyles.productList__item)}>
          <ProductCard {...product} />
        </li>
      ))}
    </ul>
  );
};

export default Products;
