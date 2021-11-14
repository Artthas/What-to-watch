import {ThunkActionResult} from '../types/action';
import {loadFilms, loadSimilarFilms, loadComments, requireAuthorization, requireLogout} from './action';
import {saveToken, dropToken, Token} from '../services/token';
import {APIRoute, AuthorizationStatus} from '../const';
import {Film} from '../types/film';
import {Comment, CommentPost} from '../types/comment';
import {AuthData} from '../types/auth-data';

export const fetchFilmAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Film[]>(APIRoute.Films);
    dispatch(loadFilms(data));
  };

export const fetchSimilarFilmAction = (movieId: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Film[]>(`${APIRoute.Films}/${movieId}/similar`);
    dispatch(loadSimilarFilms(data));
  };

export const fetchCommentAction = (movieId: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${movieId}`);
    dispatch(loadComments(data));
  };

export const postCommentAction = (movieId: string, {rating, comment}: CommentPost): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data} = await api.post<Comment[]>(`${APIRoute.Comments}/${movieId}`, {rating, comment});
    dispatch(loadComments(data));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login)
      .then(() => {
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
      });
  };

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data: {token}} = await api.post<{token: Token}>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  };


export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };