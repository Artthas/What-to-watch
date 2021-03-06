import {ThunkActionResult} from '../types/action';
import {loadFilms, loadCurrentFilm, loadMyFilms, loadSimilarFilms, loadPromoFilm, saveUserAvatarUrl, loadComments, requireAuthorization, requireLogout} from './action';
import {saveToken, dropToken, Token} from '../services/token';
import {APIRoute, AuthorizationStatus} from '../const';
import {Film} from '../types/film';
import {Comment, CommentPost} from '../types/comment';
import {AuthData} from '../types/auth-data';

type postCommentCbType = () => void;


export const fetchFilmsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Film[]>(APIRoute.Films);
    dispatch(loadFilms(data));
  };

export const fetchCurrentFilmAction = (movieId: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Film>(`${APIRoute.Films}/${movieId}`);
    dispatch(loadCurrentFilm(data));
  };

export const fetchPromoFilmAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Film>(APIRoute.Promo);
    dispatch(loadPromoFilm(data));
  };

export const fetchMyFilmsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Film[]>(APIRoute.MyFilms);
    dispatch(loadMyFilms(data));
  };

export const postMyFilmAction = (movieId: string, status: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.post<Film>(`${APIRoute.MyFilms}/${movieId}/${status}`);
    dispatch(loadCurrentFilm(data));
  };

export const fetchSimilarFilmsAction = (movieId: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Film[]>(`${APIRoute.Films}/${movieId}/similar`);
    dispatch(loadSimilarFilms(data));
  };

export const fetchCommentAction = (movieId: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${movieId}`);
    dispatch(loadComments(data));
  };

export const postCommentAction = (movieId: string, {rating, comment}: CommentPost, onSuccess: postCommentCbType, onFail: postCommentCbType): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {data} = await api.post<Comment[]>(`${APIRoute.Comments}/${movieId}`, {rating, comment});
      dispatch(loadComments(data));
      onSuccess();
    } catch(error) {
      onFail();
    }
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {data: {avatar_url: avatarUrl}} = await api.get(APIRoute.Login);
      dispatch(saveUserAvatarUrl(avatarUrl));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  };

export const loginAction = ({email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data: {token}} = await api.post<{token: Token}>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    const {data: {avatar_url: avatarUrl}} = await api.get(APIRoute.Login);
    dispatch(saveUserAvatarUrl(avatarUrl));
  };


export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };
