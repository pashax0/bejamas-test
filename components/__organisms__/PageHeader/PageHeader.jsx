import classNames from 'classnames';

import Logo from '../../__atoms__/Logo';
import Basket from '../../__atoms__/Basket';

import cssStyles from './x0.module.css';

function PageHeader({ className }) {
  return (
    <header className={classNames(cssStyles.header, className)}>
      <Logo />
      <Basket products={[1]} />
    </header>
  );
}

export default PageHeader;
