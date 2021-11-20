import Logo from '../logo/logo';
import {AppRoute, AuthorizationStatus} from '../../const';
import {Link} from 'react-router-dom';
import {getAuthorizationStatus, getUserAvatarUrl} from '../../store/user-data/selectors';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {fetchMyFilmsAction} from '../../store/api-actions';
import {logoutAction} from '../../store/api-actions';
import {useDispatch} from 'react-redux';

function Header(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const userAvatarUrl = useSelector(getUserAvatarUrl);

  const history = useHistory();

  const dispatch = useDispatch();

  return (
    <header className="page-header film-card__head">
      <div className="logo">
        <Logo />
      </div>

      <ul className="user-block">
        <li className="user-block__item">
          <div
            className="user-block__avatar"
            onClick={() => {
              dispatch(fetchMyFilmsAction());
              history.push(AppRoute.MyList);
            }}
          >
            <img src={authorizationStatus === AuthorizationStatus.Auth ? userAvatarUrl : 'img/avatar.jpg'} alt="User avatar" width="63" height="63" />
          </div>
        </li>
        <li className="user-block__item">
          {authorizationStatus === AuthorizationStatus.Auth ?
            <a
              className="user-block__link"
              href="/"
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(logoutAction());
              }}
            >
              Sign Out
            </a> :
            <Link className="user-block__link" to={AppRoute.SignIn}>Sign in</Link>}
        </li>
      </ul>
    </header>
  );
}

export default Header;
