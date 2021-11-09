import {ActionType, Actions} from '../types/action';
import {State} from '../types/state';
import {films} from '../mocks/films';

const FILMS_IN_LIST_STEP = 8;

const initialState = {
  genre: 'All genres',
  films: films,
  count: FILMS_IN_LIST_STEP,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeGenre:
      return {...state, genre: action.payload, count: 8};
    case ActionType.LoadMovies:
      return {...state, films: action.payload};
    case ActionType.ShowMoreFilms:
      return {...state, count: state.count + 8};
    default:
      return state;
  }
};

export {reducer};
