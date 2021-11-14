import {Films} from '../types/film';
import {AuthorizationStatus} from '../const';
import {Comments} from './comment';

export type State = {
  genre: string,
  films: Films,
  similarFilms: Films,
  comments: Comments,
  count: number,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
};