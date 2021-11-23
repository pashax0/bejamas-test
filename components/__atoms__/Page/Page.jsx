import Head from 'next/head';
import classNames from 'classnames';

import cssStyles from './x0.module.css';

export default function Page({ className, head, children }) {
  return (
    <div className={classNames(cssStyles.page, className)}>
      <Head>
        {head}
      </Head>
      <div className={cssStyles.page__content}>
        {children}
      </div>
    </div>
  );
}
