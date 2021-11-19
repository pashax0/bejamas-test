import classNames from "classnames";
import useSWR from 'swr';

import cssStyles from './x0.module.css';
import ProductCard from "../../__molecules__/ProductCard";
import {products} from "../../../pages";
import {useEffect, useState} from "react";

const fetcher = (url) => new Promise(function(resolve, reject) {
    setTimeout(() => resolve({products, url}), 3000);
});

const Storefront = ({ className, categories = [], prices = [], products, onToggleSorting, onChangeSortingType}) => {
    // const {products, error} = useSWR('/', fetcher);
    // console.log(products);
    // if (error) return <div>error</div>
    // if (!products) return <div>...</div>

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
                    <select onChange={(ev) => onChangeSortingType(ev.target.value)}>
                        <option value="price">price</option>
                        <option value="name">alphabet</option>
                    </select>
                </div>
            </header>
            <div className={classNames(cssStyles.storefront__main)}>
                <div className={classNames(cssStyles.storefront__filters)}>
                    <ul className={cssStyles.productFilter}>
                        {categories.map(category => (
                            <li key={category} className={cssStyles.productFilter__item}>
                                <label>
                                    <input type="checkbox"/>
                                    {category}
                                </label>
                            </li>
                        ))}
                    </ul>
                    <ul className={cssStyles.productFilter}>
                        {prices.map(price => (
                            <li key={price} className={cssStyles.productFilter__item}>
                                <label>
                                    <input type="checkbox"/>
                                    {price}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
                {products.length > 0 ? (
                    <ul className={classNames(cssStyles.storefront__products, cssStyles.productList)}>
                        {products.map(product => {
                            return (
                                <li className={classNames(cssStyles.productList__item)} key={product.name}>
                                    <ProductCard {...product} />
                                </li>
                            )
                        })}
                    </ul>
                ) : (
                    <div>loading</div>
                )}
            </div>
        </div>
    )
}

export default Storefront;