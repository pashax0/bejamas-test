import classNames from "classnames";
import useSWR from 'swr';

import cssStyles from './x0.module.css';
import ProductCard from "../../__molecules__/ProductCard";
import {products} from "../../../pages";
import {useEffect, useState} from "react";

const fetcher = (url) => new Promise(function(resolve, reject) {
    setTimeout(() => resolve({products, url}), 3000);
});

const Storefront = ({ className, categories = [], prices = []}) => {
    // const {products, error} = useSWR('/', fetcher);
    // console.log(products);
    // if (error) return <div>error</div>
    // if (!products) return <div>...</div>

    const [products, updateProducts] = useState([]);
    useEffect(async () => {
        const data = await fetcher('/');
        console.log(data);
        updateProducts(data.products);
    }, [])

    return (
        <div className={classNames(cssStyles.storefront, className)}>
            <header className={classNames(cssStyles.storefront__header)}>
                <div>
                    <span>Photography</span>
                    <span> / </span>
                    <span>Premium Photos</span>
                </div>
                <div>
                    <button>Sort By</button>
                    <select>
                        <option value="price">price</option>
                        <option value="alphabet">alphabet</option>
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
                <ul className={classNames(cssStyles.storefront__products, cssStyles.productList)}>
                    {products.map(product => {
                        return (
                            <li className={classNames(cssStyles.productList__item)} key={product.name}>
                                <ProductCard {...product} />
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Storefront;