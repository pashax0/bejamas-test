import Logo from '../../__atoms__/Logo';
import Basket from '../../__atoms__/Basket';

import cssStyles from './x0.module.css';

function PageHeader() {
  return (
    <header className={cssStyles.header}>
      <Logo />
      <Basket products={[1]} />
    </header>
  );
}

export default PageHeader;
