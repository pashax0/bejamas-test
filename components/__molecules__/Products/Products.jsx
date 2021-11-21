import classNames from "classnames";

import ProductCard from "../ProductCard";

import cssStyles from "./x0.module.css";

const Products = ({className, products}) => {
    return (
        <ul className={classNames(cssStyles.productList, className)}>
            {products.map(product => {
                return (
                    <li className={classNames(cssStyles.productList__item)} key={product.name}>
                        <ProductCard {...product} />
                    </li>
                )
            })}
        </ul>
    )
}

export default Products;