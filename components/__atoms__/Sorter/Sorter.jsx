import { useEffect, useState } from 'react';
import { BottomArrowIcon } from '../../__icons__/BotttomArrowIcon';
import { TopArrowIcon } from '../../__icons__/TopArrowIcon';

import cssStyles from './x0.module.css';

export default function Sorter({ onSortChange }) {
  const defaultSort = { by: 'name', direction: 'asc' };
  const [sort, updateSort] = useState(defaultSort);

  useEffect(() => {
    onSortChange(sort);
    // eslint-disable-next-line
  }, [sort]);

  const sortingDirectionHandler = () => {
    updateSort((prevParameters) => ({
      ...prevParameters,
      direction: prevParameters.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortingTypeHandler = (event) => {
    const type = event.target.value;

    updateSort((prevParameters) => ({ ...prevParameters, by: type }));
  };

  return (
    <div className={cssStyles.sorter}>
      <button
        type="button"
        className={cssStyles.sortDirectionButton}
        onClick={sortingDirectionHandler}
      >
        {sort.direction === 'asc' ? <BottomArrowIcon /> : <TopArrowIcon />}
        <span className={cssStyles.sortDirectionButton__text}>Sort By</span>
      </button>
      <select
        className={cssStyles.sortTypeSelect}
        defaultValue={sort.by}
        onChange={sortingTypeHandler}
      >
        <option value="price">price</option>
        <option value="name">alphabet</option>
      </select>
    </div>
  );
}
