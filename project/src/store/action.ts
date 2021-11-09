import {ActionType, ChangeGenreAction, LoadMoviesAction, ShowMoreFilmsAction} from '../types/action';
import {Films} from '../types/film';

export const changeGenre = (genreName: string): ChangeGenreAction => ({
  type: ActionType.ChangeGenre,
  payload: genreName,
});

export const loadMovies = (movies: Films): LoadMoviesAction => ({
  type: ActionType.LoadMovies,
  payload: movies,
});

export const showMoreFilms = (): ShowMoreFilmsAction => ({
  type: ActionType.ShowMoreFilms,
});
