import {Films} from '../types/film';

export enum ActionType {
  ChangeGenre = 'changeGenre',
  GetMoviesByGenre = 'getMoviesByGenre',
  LoadMovies = 'loadMovies',
  ShowMoreFilms = 'showMoreFilms',
}

export type ChangeGenreAction = {
  type: ActionType.ChangeGenre;
  payload: string,
};

export type LoadMoviesAction = {
  type: ActionType.LoadMovies;
  payload: Films,
};

export type ShowMoreFilmsAction = {
  type: ActionType.ShowMoreFilms;
};

export type Actions = ChangeGenreAction | LoadMoviesAction | ShowMoreFilmsAction;
