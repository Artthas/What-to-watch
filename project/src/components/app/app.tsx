import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import Main from '../main/main';
import AddReview from '../add-review/add-review';
import MoviePage from '../movie-page/movie-page';
import MyList from '../my-list/my-list';
import Player from '../player/player';
import SignIn from '../sign-in/sign-in';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import LoadingScreen from '../loading-screen/loading-screen';
import {getAuthorizationStatus, getIsDataLoaded} from '../../store/user-data/selectors';
import {useSelector} from 'react-redux';

const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

function App(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const isDataLoaded = useSelector(getIsDataLoaded);

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Root} component={Main}/>
        <PrivateRoute
          exact
          path={AppRoute.MyList}
          render={() => <MyList />}
        >
        </PrivateRoute>
        <PrivateRoute
          exact
          path={AppRoute.AddReview}
          render={() => <AddReview />}
        >
        </PrivateRoute>
        <Route exact path={AppRoute.MoviePage} component={MoviePage}/>
        <Route exact path={AppRoute.Player} component={Player}/>
        <Route exact path={AppRoute.SignIn} component={SignIn}/>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
