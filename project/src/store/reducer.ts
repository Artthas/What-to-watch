import {ActionType, Actions} from '../types/action';
import {State} from '../types/state';
import {AuthorizationStatus} from '../const';

const FILMS_IN_LIST_STEP = 8;

const initialState = {
  genre: 'All genres',
  films: [],
  currentFilm: {
    'id': 0,
    'name': '',
    'poster_image': '',
    'preview_image': '',
    'background_image': '',
    'background_color': '',
    'video_link': '',
    'preview_video_link': '',
    'description': '',
    'rating': 0,
    'scores_count': 0,
    'director': '',
    'starring': [],
    'run_time': 0,
    'genre': '',
    'released': 0,
    'is_favorite': false,
  },
  comments: [],
  similarFilms: [],
  count: FILMS_IN_LIST_STEP,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  userEmail: '',
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeGenre:
      return {...state, genre: action.payload, count: FILMS_IN_LIST_STEP};
    case ActionType.LoadFilms:
      return {...state, films: action.payload};
    case ActionType.LoadCurrentFilm:
      return {...state, currentFilm: action.payload};
    case ActionType.LoadSimilarFilms:
      return {...state, similarFilms: action.payload};
    case ActionType.LoadComments:
      return {...state, comments: action.payload};
    case ActionType.SaveUserEmail:
      return {...state, userEmail: action.payload};
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
