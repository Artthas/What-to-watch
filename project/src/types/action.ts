import {Films} from '../types/film';
import {Comments} from '../types/comment';
import {AuthorizationStatus} from '../const';
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
  LoadSimilarFilms = 'films/loadSimilarFilms',
  LoadComments = 'comments/loadComments',
  ShowMoreFilms = 'data/showMoreFilms',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
}

export type ChangeGenreAction = {
  type: ActionType.ChangeGenre;
  payload: string,
};

export type LoadFilmsAction = {
  type: ActionType.LoadFilms;
  payload: Films,
};

export type LoadSimilarFilmsAction = {
  type: ActionType.LoadSimilarFilms;
  payload: Films,
};

export type LoadCommentsAction = {
  type: ActionType.LoadComments;
  payload: Comments,
};

export type ShowMoreFilmsAction = {
  type: ActionType.ShowMoreFilms;
};

export type RequireAuthorizationAction = {
  type: ActionType.RequireAuthorization;
  payload: AuthorizationStatus,
};

export type RequireLogoutAction = {
  type: ActionType.RequireLogout;
};

export type Actions = ChangeGenreAction | LoadCommentsAction | LoadFilmsAction | LoadSimilarFilmsAction | ShowMoreFilmsAction | RequireAuthorizationAction | RequireLogoutAction;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
