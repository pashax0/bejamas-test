import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { categories, priceBreakpoints } from '../../../api/data/seed';
import Checkbox from '../../__atoms__/Checkbox';
import { adoptPrices } from '../../../api/adapters/prices';

import cssStyles from './x0.module.css';

export default function Filter({ className, onFilterChange }) {
  const initialFilter = {
    categories: [],
    priceConditions: [],
  };

  const [filter, updateFilter] = useState(initialFilter);

  useEffect(() => {
    onFilterChange(filter);
    // eslint-disable-next-line
  }, [filter]);

  const prices = adoptPrices(priceBreakpoints);

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
  };

  return (
    <div className={classNames(cssStyles.filters, className)}>
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
}
