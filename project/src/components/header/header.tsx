import Logo from '../logo/logo';
import {AppRoute, AuthorizationStatus} from '../../const';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import {Link} from 'react-router-dom';

const mapStateToProps = ({authorizationStatus, userEmail}: State) => ({
  authorizationStatus,
  userEmail,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Header(props: PropsFromRedux): JSX.Element {
  const {authorizationStatus, userEmail} = props;

  return (
    <header className="page-header film-card__head">
      <div className="logo">
        <Logo />
      </div>

      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar">
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

export {Header};
export default connector(Header);
