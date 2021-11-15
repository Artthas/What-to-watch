import {ActionType, ChangeGenreAction, LoadFilmsAction, LoadCurrentFilmAction, SaveUserEmailAction, LoadSimilarFilmsAction, ShowMoreFilmsAction, LoadCommentsAction} from '../types/action';
import {Films, Film} from '../types/film';
import {Comments} from '../types/comment';
import {AuthorizationStatus} from '../const';

export const changeGenre = (genreName: string): ChangeGenreAction => ({
  type: ActionType.ChangeGenre,
  payload: genreName,
});

export const loadFilms = (films: Films): LoadFilmsAction => ({
  type: ActionType.LoadFilms,
  payload: films,
});

export const loadCurrentFilm = (currentFilm: Film): LoadCurrentFilmAction => ({
  type: ActionType.LoadCurrentFilm,
  payload: currentFilm,
});

export const loadSimilarFilms = (similarFilms: Films): LoadSimilarFilmsAction => ({
  type: ActionType.LoadSimilarFilms,
  payload: similarFilms,
});

export const loadComments = (comments: Comments): LoadCommentsAction => ({
  type: ActionType.LoadComments,
  payload: comments,
});

export const showMoreFilms = (): ShowMoreFilmsAction => ({
  type: ActionType.ShowMoreFilms,
});

export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
} as const);

export const saveUserEmail = (userEmail: string): SaveUserEmailAction => ({
  type: ActionType.SaveUserEmail,
  payload: userEmail,
});

export const requireLogout = () => ({
  type: ActionType.RequireLogout,
} as const);
