import { dummyProducts } from './seed';

const fetcher = (
  filter = { categories: [], priceConditions: [] },
  sort = {},
  page = 1,
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

export function getProducts({ filter, sort, page }) {
  const data = fetcher(filter, sort, page);

  return data;
}
