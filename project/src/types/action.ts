import {Action} from 'redux';
import {
  ThunkAction,
  ThunkDispatch
} from 'redux-thunk';
import {
  AxiosInstance
} from 'axios';
import {State} from '../types/state';

export enum ActionType {
  ChangeGenre = 'films/changeGenre',
  LoadFilms = 'films/loadFilms',
  LoadCurrentFilm = 'films/loadCurrentFilm',
  LoadPromoFilm = 'films/loadPromoFilm',
  LoadSimilarFilms = 'films/loadSimilarFilms',
  LoadMyFilms = 'films/loadMyFilms',
  LoadComments = 'comments/loadComments',
  ShowMoreFilms = 'data/showMoreFilms',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  UserAuthorization = 'user/userAuthorization',
  SaveUserEmail = 'user/saveUserEmail',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
