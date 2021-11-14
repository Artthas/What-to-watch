import {ActionType, Actions} from '../types/action';
import {State} from '../types/state';
import {AuthorizationStatus} from '../const';

const FILMS_IN_LIST_STEP = 8;

const initialState = {
  genre: 'All genres',
  films: [],
  comments: [],
  similarFilms: [],
  count: FILMS_IN_LIST_STEP,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeGenre:
      return {...state, genre: action.payload, count: FILMS_IN_LIST_STEP};
    case ActionType.LoadFilms:
      return {...state, films: action.payload};
    case ActionType.LoadSimilarFilms:
      return {...state, similarFilms: action.payload};
    case ActionType.LoadComments:
      return {...state, comments: action.payload};
    case ActionType.ShowMoreFilms:
      return {...state, count: state.count + FILMS_IN_LIST_STEP};
    case ActionType.RequireAuthorization:
      return {
        ...state,
        authorizationStatus: action.payload,
        isDataLoaded: true,
      };
    case ActionType.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
    default:
      return state;
  }
};

export {reducer};
