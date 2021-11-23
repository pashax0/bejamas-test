import { FilterIcon } from '../../__icons__/FilterIcon';

import cssStyles from './x0.module.css';

export default function FilterButton({ onClick }) {
  return (
    <button
      type="button"
      aria-label="open filters"
      className={cssStyles.filterButton}
      onClick={onClick}
    >
      <FilterIcon />
    </button>
  );
}
