import { useState } from "react";
import classNames from "classnames";

import {Basket as BasketIcon} from "../../__icons__/Basket";

import cssStyles from './x0.module.css';

const Basket = ({products = []}) => {
    const isNotEmpty = products.length > 0;

    const [isOpened, toggleBasket] = useState(false);

    return (
        <div className={cssStyles.basket} onClick={() => toggleBasket(!isOpened)}>
            <button type="button">
                <BasketIcon />
            </button>
            {isNotEmpty && (
                <div className={classNames(cssStyles.basket__badge, isOpened ? cssStyles.basket__badge_showed : cssStyles.basket__badge_hidden, cssStyles.basketBadge)}>
                    <button>CLEAR</button>
                </div>
            )}
        </div>
    )
}

export default Basket;