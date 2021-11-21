import Footer from '../footer/footer';
import {AuthData} from '../../types/auth-data';
import {loginAction} from '../../store/api-actions';
import {useRef, FormEvent} from 'react';
import {AppRoute} from '../../const';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import Header from '../header/header';

function SignIn(): JSX.Element {

  const dispatch = useDispatch();

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const history = useHistory();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
    }
    history.push(AppRoute.Root);
  };

  return (
    <div className="user-page">

      <Header isMyList={false} isSignIn headerTitle={'user-page__head'}/>

      <div className="sign-in user-page__content">
        <form
          action="#"
          className="sign-in__form"
          onSubmit={handleSubmit}
        >
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                ref={emailRef}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                ref={passwordRef}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button
              className="sign-in__btn"
              type="submit"
            >Sign in
            </button>
          </div>
        </form>
      </div>

      <Footer />

    </div>
  );
}

export default SignIn;
