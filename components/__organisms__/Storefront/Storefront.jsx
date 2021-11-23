import { useEffect, useState } from 'react';
// import dynamic from 'next/dynamic';
import classNames from 'classnames';

import useWindowSize from '../../../hooks/useWindowSize';
import { dummyProducts } from '../../../data/seed';
import Products from '../../__molecules__/Products';
import Pagination from '../../__atoms__/Pagination';
import Filter from '../../__molecules__/Filter';
import { BotttomArrowIcon } from './BotttomArrowIcon';
import { TopArrowIcon } from './TopArrowIcon';
import { FilterIcon } from '../../__icons__/FilterIcon';

import cssStyles from './x0.module.css';

// const Modal = dynamic(() => import('../../__molecules__/Modal'), { ssr: false });

const fetcher = (
  page,
  sort = {},
  filter = { categories: [], priceConditions: [] },
) => new Promise((resolve) => {
  const { by: sortBy = 'name', direction: sortDirection = 'asc' } = sort;
  const { categories: filteredCategories, priceConditions } = filter;

  const filteredByCategoriesProducts = filteredCategories.length > 0
    ? dummyProducts.filter((product) => filteredCategories.includes(product.category))
    : dummyProducts;

  const filteredProducts = priceConditions.length > 0
    ? filteredByCategoriesProducts.filter((product) => {
      const { price } = product;
      if (!price) {
        return true;
      }
      return !!priceConditions.find((condition) => {
        // eslint-disable-next-line
        const x = price;
        // TODO: remove EVAL
        // eslint-disable-next-line no-eval
        return eval(condition);
      });
    })
    : filteredByCategoriesProducts;

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (a[sortBy] > b[sortBy]) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    if (a[sortBy] < b[sortBy]) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    return 0;
  });

  const products = sortedProducts.slice((page * 6) - 6, page * 6);

  setTimeout(() => {
    resolve({ products, count: sortedProducts.length });
  }, 1000);
});

function Storefront({
  className,
}) {
  // const [isModalOpened, openModal] = useState(false);
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

  const { by: sortBy, direction: sortingDirection } = productParameters.sort;

  useEffect(() => {
    async function fetchProducts() {
      const data = await fetcher(productParameters.currentPage, productParameters.sort, productParameters.filter);
      updateProducts(data.products);
      updateProductsCount(data.count);
    }

    fetchProducts();
  }, [productParameters]);

  const filterChangeHandler = (newFilter) => {
    updateProductParameters((prevParameters) => ({
      ...prevParameters,
      filter: newFilter,
      currentPage: 1,
    }));
  };

  const sortingDirectionHandler = () => {
    updateProductParameters((prevParameters) => ({
      ...prevParameters,
      sort: { ...prevParameters.sort, direction: prevParameters.sort.direction === 'asc' ? 'desc' : 'asc' },
      currentPage: 1,
    }));
  };

  const sortingTypeHandler = (event) => {
    const type = event.target.value;

    updateProductParameters((prevParameters) => ({
      ...prevParameters,
      sort: { ...prevParameters.sort, by: type },
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
        <h2 className={cssStyles.header}>
          <span>Photography</span>
          <span> / </span>
          <span className={cssStyles.header__subcategory}>Premium Photos</span>
        </h2>
        {showDesktopFilter ? (
          <div>
            <button
              type="button"
              className={cssStyles.sortDirectionButton}
              onClick={sortingDirectionHandler}
            >
              {sortingDirection === 'asc' ? <BotttomArrowIcon /> : <TopArrowIcon />}
              <span className={cssStyles.sortDirectionButton__text}>Sort By</span>
            </button>
            <select className={cssStyles.sortTypeSelect} defaultValue={sortBy} onChange={sortingTypeHandler}>
              <option value="price">price</option>
              <option value="name">alphabet</option>
            </select>
          </div>
        ) : (
          <button
            type="button"
            aria-label="open filters"
            className={cssStyles.filterButton}
            onClick={toggleMobileFilter}
          >
            <FilterIcon />
          </button>
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
        {/* {true ? ( */}
        {/*  renderFilters() */}
        {/* ) : ( */}
        {/*  isModalOpened && ( */}
        {/*  <Modal onModalClose={() => { openModal(false); }}> */}
        {/*    <div> */}
        {/*      {renderFilters()} */}
        {/*    </div> */}
        {/*  </Modal> */}
        {/*  ) */}
        {/* )} */}
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
