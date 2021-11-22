import classNames from 'classnames';

import cssStyles from './x0.module.css';
import { NextIcon } from './NextIcon';
import { PreviousIcon } from './PreviousIcon';

export default function Pagination({
  className, countOfProducts, productsPerPage = 6, currentPage, onPageClick,
}) {
  const countOfPages = Math.ceil(countOfProducts / productsPerPage);
  const pages = Array.apply(null, Array(countOfPages)).map((x, i) => i + 1);
  const FIRS_PAGE_NUMBER = 1;

  const shouldRenderPreviousButton = currentPage > FIRS_PAGE_NUMBER;
  const shouldRenderNextButton = countOfPages > currentPage;

  return (
    <div className={classNames(cssStyles.pagination, className)}>
      <button
        type="button"
        className={classNames(
          cssStyles.navigationButton,
          shouldRenderPreviousButton ? cssStyles.navigationButton_visible : cssStyles.navigationButton_hidden,
        )}
        onClick={() => onPageClick(currentPage - FIRS_PAGE_NUMBER)}
      >
        <PreviousIcon />
      </button>
      <ul className={cssStyles.paginationList}>
        {pages.map((page) => (
          <li key={page}>
            <button
              className={classNames(
                cssStyles.navigationButton,
                currentPage === page && cssStyles.navigationButton_active,
              )}
              value={page}
              onClick={(event) => {
                onPageClick(+event.target.value);
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
          cssStyles.navigationButton,
          shouldRenderNextButton ? cssStyles.navigationButton_visible : cssStyles.navigationButton_hidden,
        )}
        onClick={() => onPageClick(currentPage + FIRS_PAGE_NUMBER)}
      >
        <NextIcon />
      </button>
    </div>
  );
}
