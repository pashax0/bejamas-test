import cssStyles from './x0.module.css';
import { BejamasLogo } from '../../__icons__/BejamasLogo';

function Logo() {
  return (
    <div className={cssStyles.logo}>
      <BejamasLogo />
    </div>
  );
}

export default Logo;
