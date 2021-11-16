import {NameSpace} from '../root-reducer';
import {State} from '../../types/state';
import {Films, Film} from '../../types/film';

export const getFilms = (state: State): Films => state[NameSpace.films].films;
export const getSimilarFilms = (state: State): Films => state[NameSpace.films].similarFilms;
export const getCurrentFilm = (state: State): Film => state[NameSpace.films].currentFilm;
