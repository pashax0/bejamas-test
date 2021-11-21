import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import useSWR from 'swr';

import { dummyProducts, categories, prices } from '../../../data/seed';
import Products from '../../__molecules__/Products';

import cssStyles from './x0.module.css';

const fetcher = (page, sort = {}, filter = { categories: [] }) => new Promise((resolve, reject) => {
  const { by: sortBy = 'name', direction: sortDirection = 'asc' } = sort;
  const { categories } = filter;

  const filteredProducts = categories.length > 0
    ? dummyProducts.filter((product) => categories.includes(product.category))
    : dummyProducts;

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
  }, 500);
});

const Storefront = function ({
  className,
  onToggleSorting,
  onChangeSortingType,
  onProductFilterUpdate,
}) {
  // const {products, error} = useSWR('/', fetcher);
  // console.log(products);
  // if (error) return <div>error</div>
  // if (!products) return <div>...</div>

  const router = useRouter();

  const [products, updateProducts] = useState([]);
  const [sort, updateSorting] = useState({ by: 'name', direction: 'asc' });
  // const [filter, updateFilter] = useState({categories: []});

  useEffect(async () => {
    const data = await fetcher(1, sort, filter);
    updateProducts(data.products);
  }, [sort]);

  const changeSortingDirection = () => {
    updateSorting((prevSorting) => ({
      ...prevSorting,
      direction: prevSorting.direction === 'asc' ? 'desc' : 'asc',
    }));
    // TODO: handle router correctly for different parameters
    console.log(router);
    router.push('?sort=asc', undefined, { shallow: true });
  };

  const changeSortingType = (type) => {
    updateSorting((prevSorting) => ({
      ...prevSorting,
      by: type,
    }));
    router.push(`?sortBy=${type}`, undefined, { shallow: true });
  };

  const filterProducts = (newFilter) => {
    updateFilter(newFilter);
  };

  const initialFilter = {
    categories: [],
  };

  const [filter, updateFilter] = useState(initialFilter);

  const { by: sortBy } = sort;

  const updateProductFilter = (event) => {
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
    onProductFilterUpdate(filter);
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
          <button type="button" onClick={onToggleSorting}>Sort By</button>
          <select defaultValue={sortBy} onChange={(ev) => onChangeSortingType(ev.target.value)}>
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
                    <input type="checkbox" name={category} onChange={updateProductFilter} />
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
                    <input type="checkbox" />
                    {price}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={cssStyles.storefront__products}>
          {products.length > 0 ? (
            <Products products={products} />
          ) : (
            <div>loading</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Storefront;
