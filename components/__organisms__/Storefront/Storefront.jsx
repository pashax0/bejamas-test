import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import { dummyProducts, categories, priceBreakpoints } from '../../../data/seed';
import { adoptPrices } from '../../../api/adapters/prices';
import Products from '../../__molecules__/Products';

import cssStyles from './x0.module.css';

const fetcher = (page, sort = {}, filter = { categories: [], priceConditions: [] }) => new Promise((resolve, reject) => {
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
        const x = price;
        // TODO: remove EVAL
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

  const [currentPage, updateCurrentPage] = useState(1);
  const [filter, updateFilter] = useState(initialFilter);
  const [products, updateProducts] = useState(null);
  const [productsCount, updateProductsCount] = useState(null);
  const [sort, updateSorting] = useState({ by: 'name', direction: 'asc' });

  const { by: sortBy } = sort;

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

  const renderPagination = (countOfProducts) => {
    const countOfPages = Math.ceil(countOfProducts / 6);
    const pages = Array.apply(null, Array(countOfPages)).map((x, i) => ++i);

    const shouldRenderPreviousButton = currentPage > 1;
    const shouldRenderNextButton = countOfPages > currentPage;

    return (
      <div className={cssStyles.pagination}>
        <button
          type="button"
          className={classNames(
            cssStyles.pagination__navigationButton,
            shouldRenderPreviousButton && cssStyles.pagination__navigationButton_visible,
          )}
        >
          {'<'}
        </button>
        <ul className={cssStyles.paginationList}>
          {pages.map((page) => (
            <li key={page}>
              <button
                value={page}
                onClick={(event) => {
                  updateCurrentPage(event.target.value);
                }}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={classNames(
            cssStyles.pagination__navigationButton,
            shouldRenderNextButton && cssStyles.pagination__navigationButton_visible,
          )}
        >
          {'>'}
        </button>
      </div>
    );
  };

  return (
    <div className={classNames(cssStyles.storefront, className)}>
      <header className={classNames(cssStyles.storefront__header)}>
        <div>
          <span>Photography</span>
          <span> / </span>
          <span>Premium Photos</span>
        </div>
        <div>
          <button type="button" onClick={sortingDirectionHandler}>Sort By</button>
          <select defaultValue={sortBy} onChange={sortingTypeHandler}>
            <option value="price">price</option>
            <option value="name">alphabet</option>
          </select>
        </div>
      </header>
      <div className={classNames(cssStyles.storefront__main)}>
        <div className={classNames(cssStyles.storefront__filters)}>
          <div className={cssStyles.filter}>
            <ul className={cssStyles.productFilter}>
              {categories.map((category) => (
                <li key={category} className={cssStyles.productFilter__item}>
                  <label className={cssStyles.filterLabel}>
                    <input type="checkbox" name={category} onChange={filterCategoryHandler} />
                    {category}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className={cssStyles.filter}>
            <ul className={cssStyles.productFilter}>
              {prices.map((price) => (
                <li key={price} className={cssStyles.productFilter__item}>
                  <label className={cssStyles.filterLabel}>
                    <input type="checkbox" name={price.condition} onChange={filterPriceHandler} />
                    {price.description}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={cssStyles.storefront__products}>
          {products ? (
            renderProducts(products)
          ) : (
            <div>loading...</div>
          )}
          {productsCount && (
            renderPagination(productsCount)
          )}
        </div>
      </div>
    </div>
  );
}

export default Storefront;
