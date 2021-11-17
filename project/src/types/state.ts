import {Film, Films} from '../types/film';
import {AuthorizationStatus} from '../const';
import {Comments} from './comment';
import {RootState} from '../store/root-reducer';

export type FilmsData = {
  films: Films,
  currentFilm: Film,
  similarFilms: Films,
  promoFilm: Film,
  myFilms: Films,
}

export type FilmsOtherData = {
  genre: string,
  comments: Comments,
  count: number,
}

export type UserData = {
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  userEmail: string,
};

export type State = RootState;
