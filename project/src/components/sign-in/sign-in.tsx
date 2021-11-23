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
    if (passwordRef.current && emailRef.current) {
      if (!re.test(passwordRef.current.value)) {
        passwordRef.current.setCustomValidity('Пароль должен состоять минимум из одной буквы и цифры.');
        passwordRef.current.reportValidity();
      } else {
        onSubmit({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        });
        history.push(AppRoute.Root);
      }
    }
  };

  const re = /[0-9]{1,}[a-zA-Z]{1,}|[a-zA-Z]{1,}[0-9]{1,}/;

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
                onChange={(evt) => {
                  if (re.test(evt.target.value)) {
                    evt.target.setCustomValidity('');
                    evt.target.reportValidity();
                  }
                }}
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
