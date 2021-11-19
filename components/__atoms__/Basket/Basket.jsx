import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import classNames from "classnames";

import {Basket as BasketIcon} from "../../__icons__/Basket";
import {clearBasket} from "../../../redux/actions";

import cssStyles from './x0.module.css';

const Basket = () => {
    const products = useSelector(state => state.basket)
    const isNotEmpty = products.length > 0;

    const dispatch = useDispatch();

    const [isOpened, toggleBasket] = useState(false);

    return (
        <div className={cssStyles.basket} onClick={() => toggleBasket(!isOpened)}>
            <button type="button">
                <BasketIcon />
            </button>
            {isNotEmpty && (
                <>
                    <div className={cssStyles.basket__counter}>
                        {products.length}
                    </div>
                    <div className={classNames(cssStyles.basket__badge, isOpened ? cssStyles.basket__badge_showed : cssStyles.basket__badge_hidden, cssStyles.basketBadge)}>
                        {products.map(product => (
                            <div>{product}</div>
                        ))}
                        <button onClick={() => dispatch(clearBasket())}>CLEAR</button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Basket;