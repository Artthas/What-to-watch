import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useDispatch} from 'react-redux';
import {logoutAction} from '../../store/api-actions';

type AuthorizationProps = {
  authorizationStatus: string
}

function Authorization({authorizationStatus}: AuthorizationProps): JSX.Element {

  const dispatch = useDispatch();

  return (
    authorizationStatus === AuthorizationStatus.Auth ?
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
      <Link className="user-block__link" to={AppRoute.SignIn}>Sign in</Link>
  );
}

export default Authorization;
