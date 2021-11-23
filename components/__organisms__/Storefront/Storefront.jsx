import { useEffect, useState } from 'react';
import classNames from 'classnames';
import dynamic from 'next/dynamic';

import Products from '../../__molecules__/Products';
import Pagination from '../../__atoms__/Pagination';
import Filter from '../../__molecules__/Filter';

import useWindowSize from '../../../hooks/useWindowSize';
import { getProducts } from '../../../api/data/products';

import cssStyles from './x0.module.css';

const Sorter = dynamic(() => import('../../__atoms__/Sorter'));
const FilterButton = dynamic(() => import('../../__atoms__/FilterButton'));

function Storefront({
  className,
}) {
  const defaultProductParameters = {
    filter: undefined,
    sort: { by: 'name', direction: 'asc' },
    currentPage: 1,
  };

  const [showFilter, toggleFilterShowing] = useState(false);
  const [productParameters, updateProductParameters] = useState(defaultProductParameters);
  const [products, updateProducts] = useState(null);
  const [productsCount, updateProductsCount] = useState(null);

  const MOBILE_FILTER_BREAKPOINT = 768;
  const { width: screenWidth } = useWindowSize();

  const showDesktopFilter = screenWidth > MOBILE_FILTER_BREAKPOINT;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const data = await getProducts({
      page: productParameters.currentPage,
      sort: productParameters.sort,
      filter: productParameters.filter,
    });
    updateProducts(data.products);
    updateProductsCount(data.count);
  }, [productParameters]);

  const filterChangeHandler = (newFilter) => {
    updateProductParameters((prevParameters) => ({
      ...prevParameters,
      filter: newFilter,
      currentPage: 1,
    }));
  };

  const sortChangeHandler = (newSort) => {
    updateProductParameters((prevParameters) => ({
      ...prevParameters,
      sort: newSort,
      currentPage: 1,
    }));
  };

  const updateCurrentPage = (page) => {
    updateProductParameters((prevParameters) => ({
      ...prevParameters,
      currentPage: page,
    }));
  };

  const renderProducts = (renderedProducts) => (
    renderedProducts.length > 0 ? (
      <Products products={renderedProducts} />
    ) : (
      <div>no products with the appropriate characteristics</div>
    )
  );

  const toggleMobileFilter = () => {
    toggleFilterShowing(!showFilter);
  };

  return (
    <div className={classNames(cssStyles.storefront, className)}>
      <header className={classNames(cssStyles.storefront__header)}>
        <h2>
          <span>Photography</span>
          <span> / </span>
          <span className={cssStyles.header__subcategory}>Premium Photos</span>
        </h2>
        {showDesktopFilter ? (
          <Sorter onSortChange={sortChangeHandler} />
        ) : (
          <FilterButton onClick={toggleMobileFilter} />
        )}
      </header>
      <div className={classNames(cssStyles.storefront__main)}>
        <Filter
          className={classNames(
            cssStyles.storefront__filter,
            !showDesktopFilter && cssStyles.storefront__filter_mobile,
            showDesktopFilter || showFilter ? cssStyles.storefront__filter_show : cssStyles.storefront__filter_hide,
          )}
          onFilterChange={filterChangeHandler}
        />
        <div className={classNames(cssStyles.storefront__products, cssStyles.products)}>
          {products ? (
            renderProducts(products)
          ) : (
            <div>loading...</div>
          )}
          {(products?.length > 0 && productsCount) && (
            <Pagination
              countOfProducts={productsCount}
              currentPage={productParameters.currentPage}
              onPageClick={updateCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Storefront;
