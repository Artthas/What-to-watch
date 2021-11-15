import {Film, Films} from '../types/film';
import {AuthorizationStatus} from '../const';
import {Comments} from './comment';

export type State = {
  genre: string,
  films: Films,
  currentFilm: Film,
  similarFilms: Films,
  comments: Comments,
  count: number,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  userEmail: string,
};
