import Logo from '../logo/logo';
import {AppRoute, AuthorizationStatus} from '../../const';
import {getAuthorizationStatus, getUserAvatarUrl} from '../../store/user-data/selectors';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {fetchMyFilmsAction} from '../../store/api-actions';
import {useDispatch} from 'react-redux';
import Authorization from '../authorization-status/authorization-status';

type HeaderProps = {
  isMyList: boolean,
  isSignIn: boolean,
  headerTitle: string,
}

function Header({isMyList, isSignIn, headerTitle}: HeaderProps): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const userAvatarUrl = useSelector(getUserAvatarUrl);

  const history = useHistory();

  const dispatch = useDispatch();

  return (
    <header className={`page-header ${headerTitle}`}>
      <div className="logo">
        <Logo />
      </div>

      {isMyList ? <h1 className="page-title user-page__title">My list</h1> : ''}

      {isSignIn ? <h1 className="page-title user-page__title">Sign in</h1> : ''}

      {!isSignIn ?
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
            <Authorization authorizationStatus={authorizationStatus}/>
          </li>
        </ul> : ''}
    </header>
  );
}

export default Header;
