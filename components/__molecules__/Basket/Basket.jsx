import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import classNames from 'classnames';

import { Basket as BasketIcon } from '../../__icons__/Basket';
import { clearBasket, closeBasket, openBasket } from '../../../state/actions';

import cssStyles from './x0.module.css';
import { Cross } from '../../__icons__/Cross';

const BasketProduct = dynamic(() => import('./BasketProduct'));

function Basket() {
  const isOpened = useSelector((state) => state.basket.isOpened);
  const products = useSelector((state) => state.basket.products);
  const isNotEmpty = products.length > 0;

  const dispatch = useDispatch();

  return (
    <div className={cssStyles.basket}>
      <button
        type="button"
        aria-label="basket"
        className={cssStyles.openButton}
        onClick={() => dispatch(isOpened ? closeBasket() : openBasket())}
      >
        <BasketIcon />
      </button>
      {isNotEmpty && (
        <>
          <div className={classNames(cssStyles.basket__counter, cssStyles.counter)}>
            {products.length}
          </div>
          <div className={classNames(
            cssStyles.basket__badge,
            isOpened ? cssStyles.basket__badge_showed : cssStyles.basket__badge_hidden,
            cssStyles.basketBadge,
          )}
          >
            <button
              type="button"
              className={classNames(
                cssStyles.basketBadge__closeButton,
                cssStyles.closeButton,
              )}
              onClick={() => dispatch(closeBasket())}
            >
              <Cross />
            </button>
            <ul className={classNames(
              cssStyles.basketBadge__products,
              cssStyles.productsList,
            )}
            >
              {products.map((product) => (
                <li key={product.id}>
                  <BasketProduct product={product} />
                </li>
              ))}
            </ul>
            <button
              type="button"
              tabIndex={isOpened ? 0 : -1}
              className={classNames(
                cssStyles.clearButton,
              )}
              onClick={() => dispatch(clearBasket())}
            >
              CLEAR
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Basket;
