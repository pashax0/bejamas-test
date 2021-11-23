import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import classNames from 'classnames';

import useWindowSize from '../../../hooks/useWindowSize';
import { dummyProducts, categories, priceBreakpoints } from '../../../data/seed';
import { adoptPrices } from '../../../api/adapters/prices';
import Products from '../../__molecules__/Products';
import Checkbox from '../../__atoms__/Checkbox';
import Pagination from '../../__atoms__/Pagination';
import { BotttomArrowIcon } from './BotttomArrowIcon';
import { TopArrowIcon } from './TopArrowIcon';
import { FilterIcon } from '../../__icons__/FilterIcon';

import cssStyles from './x0.module.css';

const Modal = dynamic(() => import('../../__molecules__/Modal'), { ssr: false });

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
  const router = useRouter();

  const initialFilter = {
    categories: [],
    priceConditions: [],
  };

  const prices = adoptPrices(priceBreakpoints);

  const [isModalOpened, openModal] = useState(false);
  const [currentPage, updateCurrentPage] = useState(1);
  const [filter, updateFilter] = useState(initialFilter);
  const [products, updateProducts] = useState(null);
  const [productsCount, updateProductsCount] = useState(null);
  const [sort, updateSorting] = useState({ by: 'name', direction: 'asc' });

  const MOBILE_FILTER_BREAKPOINT = 768;
  const { width: screenWidth } = useWindowSize();

  const showDesktopFilter = screenWidth > MOBILE_FILTER_BREAKPOINT;

  const { by: sortBy, direction: sortingDirection } = sort;

  useEffect(() => {
    async function fetchProducts() {
      const data = await fetcher(currentPage, sort, filter);
      updateProducts(data.products);
      updateProductsCount(data.count);
    }

    fetchProducts();
  }, [sort, filter, currentPage]);

  const sortingDirectionHandler = () => {
    updateSorting((prevSorting) => ({
      ...prevSorting,
      direction: prevSorting.direction === 'asc' ? 'desc' : 'asc',
    }));

    // TODO: handle router correctly for different parameters
    router.push('?sort=asc', undefined, { shallow: true });
  };

  const sortingTypeHandler = (event) => {
    const type = event.target.value;

    updateSorting((prevSorting) => ({
      ...prevSorting,
      by: type,
    }));
    updateCurrentPage(1);

    router.push(`?sortBy=${type}`, undefined, { shallow: true });
  };

  const filterCategoryHandler = (event) => {
    updateFilter((prevFilter) => {
      const updatedCategory = event.target.name;
      const isUpdatedCategoryChecked = event.target.checked;
      const { categories: prevCategories } = prevFilter;

      let updatedCategories = [];

      if (isUpdatedCategoryChecked) {
        updatedCategories = [...prevCategories, updatedCategory];
      } else {
        updatedCategories = prevCategories.filter((category) => category !== updatedCategory);
      }

      return { ...prevFilter, categories: updatedCategories };
    });
    updateCurrentPage(1);
  };

  const filterPriceHandler = (event) => {
    updateFilter((prevFilter) => {
      const updatedPrice = event.target.name;
      const isUpdatedPriceChecked = event.target.checked;
      const { priceConditions: prevPriceConditions } = prevFilter;

      let updatedPrices = [];

      if (isUpdatedPriceChecked) {
        updatedPrices = [...prevPriceConditions, updatedPrice];
      } else {
        updatedPrices = prevPriceConditions.filter((condition) => condition !== updatedPrice);
      }

      return { ...prevFilter, priceConditions: updatedPrices };
    });
    updateCurrentPage(1);
  };

  const renderProducts = (renderedProducts) => (
    renderedProducts.length > 0 ? (
      <Products products={renderedProducts} />
    ) : (
      <div>no products with the appropriate characteristics</div>
    )
  );

  const renderFilters = () => (
    <div className={classNames(cssStyles.storefront__filters, cssStyles.filters)}>
      <div className={cssStyles.filter}>
        <h3 className={cssStyles.filterHeader}>Category</h3>
        <ul className={cssStyles.productFilter}>
          {categories.map((category, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={i} className={cssStyles.productFilter__item}>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label className={cssStyles.filterLabel}>
                <Checkbox className={cssStyles.filterCheckbox} name={category} onChange={filterCategoryHandler} />
                {category}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className={cssStyles.filter}>
        <h3 className={cssStyles.filterHeader}>
          Price range
        </h3>
        <ul className={cssStyles.productFilter}>
          {prices.map((price, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={i} className={cssStyles.productFilter__item}>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label className={cssStyles.filterLabel}>
                <Checkbox
                  className={cssStyles.filterCheckbox}
                  name={price.condition}
                  onChange={filterPriceHandler}
                />
                {price.description}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const openFiltersClickHandler = () => {
    openModal(true);
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
            onClick={openFiltersClickHandler}
          >
            <FilterIcon />
          </button>
        )}
      </header>
      <div className={classNames(cssStyles.storefront__main)}>
        {showDesktopFilter ? (
          renderFilters()
        ) : (
          isModalOpened && (
          <Modal onModalClose={() => { openModal(false); }}>
            <div>
              {renderFilters()}
            </div>
          </Modal>
          )
        )}
        <div className={classNames(cssStyles.storefront__products, cssStyles.products)}>
          {products ? (
            renderProducts(products)
          ) : (
            <div>loading...</div>
          )}
          {(products?.length > 0 && productsCount) && (
            <Pagination countOfProducts={productsCount} currentPage={currentPage} onPageClick={updateCurrentPage} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Storefront;
