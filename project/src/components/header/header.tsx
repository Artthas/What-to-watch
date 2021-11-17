import Logo from '../logo/logo';
import {AppRoute, AuthorizationStatus} from '../../const';
import {Link} from 'react-router-dom';
import {getAuthorizationStatus, getUserEmail} from '../../store/user-data/selectors';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

function Header(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const userEmail = useSelector(getUserEmail);

  const history = useHistory();

  return (
    <header className="page-header film-card__head">
      <div className="logo">
        <Logo />
      </div>

      <ul className="user-block">
        <li className="user-block__item">
          <div
            className="user-block__avatar"
            onClick={() => history.push(AppRoute.MyList)}
          >
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
          </div>
        </li>
        <li className="user-block__item">
          {authorizationStatus === AuthorizationStatus.Auth ? <a className="user-block__link" href="/">{userEmail}</a> : <Link className="user-block__link" to={AppRoute.SignIn}>Sign in</Link>}
        </li>
      </ul>
    </header>
  );
}

export default Header;
