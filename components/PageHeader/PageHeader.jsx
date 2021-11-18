import Logo from "../__atoms__/Logo";
import Basket from "../__atoms__/Basket";

import cssStyles from './x0.module.css';

const PageHeader = () => {
    return (
        <header className={cssStyles.header}>
            <Logo />
            <Basket />
        </header>
    )
}

export default PageHeader;