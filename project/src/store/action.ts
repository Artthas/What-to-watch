import {ActionType} from '../types/action';
import {Films, Film} from '../types/film';
import {Comments} from '../types/comment';
import {AuthorizationStatus} from '../const';
import {createAction} from '@reduxjs/toolkit';

export const changeGenre = createAction(
  ActionType.ChangeGenre,
  (genreName: string) => ({
    payload: genreName,
  }),
);

export const loadFilms = createAction(
  ActionType.LoadFilms,
  (films: Films) => ({
    payload: films,
  }),
);

export const loadMyFilms = createAction(
  ActionType.LoadMyFilms,
  (myFilms: Films) => ({
    payload: myFilms,
  }),
);

export const loadCurrentFilm = createAction(
  ActionType.LoadCurrentFilm,
  (currentFilm: Film) => ({
    payload: currentFilm,
  }),
);

export const loadPromoFilm = createAction(
  ActionType.LoadPromoFilm,
  (promoFilm: Film) => ({
    payload: promoFilm,
  }),
);

export const loadSimilarFilms = createAction(
  ActionType.LoadSimilarFilms,
  (similarFilms: Films) => ({
    payload: similarFilms,
  }),
);

export const loadComments = createAction(
  ActionType.LoadComments,
  (comments: Comments) => ({
    payload: comments,
  }),
);

export const requireAuthorization = createAction(
  ActionType.RequireAuthorization,
  (authStatus: AuthorizationStatus) => ({
    payload: authStatus,
  }),
);

export const saveUserAvatarUrl = createAction(
  ActionType.SaveUserAvatarUrl,
  (userEmail: string) => ({
    payload: userEmail,
  }),
);

export const requireLogout = createAction(ActionType.RequireLogout);

