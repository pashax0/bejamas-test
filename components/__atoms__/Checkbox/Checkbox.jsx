import { useState } from 'react';
import classNames from 'classnames';

import { CheckIcon } from '../../__icons__/CheckIcon';
import cssStyles from './x0.module.css';

export default function Checkbox({ className, name, onChange }) {
  const [isChecked, updateChecked] = useState(false);

  const changeHandler = (event) => {
    updateChecked(event.target.checked);
    onChange(event);
  };

  return (
    <span className={classNames(cssStyles.checkbox, className)}>
      <input className={cssStyles.input} type="checkbox" name={name} onChange={changeHandler} />
      {isChecked && <CheckIcon />}
    </span>
  );
}
