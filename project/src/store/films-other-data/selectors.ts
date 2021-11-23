import {NameSpace} from '../root-reducer';
import {State} from '../../types/state';
import {Comments} from '../../types/comment';

export const getGenre = (state: State): string => state[NameSpace.filmsOther].genre;
export const getComments = (state: State): Comments => state[NameSpace.filmsOther].comments;
