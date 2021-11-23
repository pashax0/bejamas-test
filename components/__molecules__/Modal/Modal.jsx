import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

import cssStyles from './x0.module.css';

const appRoot = document.getElementById('__next');

/* Need to import only dynamicly and with ssr: false */
export default function Modal({
  children, className, isOpen, onModalClose,
}) {
  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.classList.add(cssStyles.modal_open);
  //   } else {
  //     document.body.classList.remove(cssStyles.modal_open);
  //   }
  // }, [isOpen]);

  const closeModalHandler = () => {
    if (onModalClose) {
      onModalClose();
    }
  };

  return createPortal(
    <div
      className={classNames(
        cssStyles.modal,
        className,
      )}
      role="dialog"
      onClick={closeModalHandler}
      aria-hidden
    >
      <button onClick={onModalClose}>X</button>
      {children}
    </div>,
    appRoot,
  );
}
