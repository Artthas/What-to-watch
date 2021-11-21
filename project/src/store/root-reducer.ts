import {combineReducers} from 'redux';
import {filmsData} from './films-data/films-data';
import {filmsOtherData} from './films-other-data/films-other-data';
import {userData} from './user-data/user-data';

export enum NameSpace {
  films = 'FILMS',
  filmsOther = 'FILMS_OTHER',
  user = 'USER',
}

export const rootReducer = combineReducers({
  [NameSpace.films]: filmsData,
  [NameSpace.filmsOther]: filmsOtherData,
  [NameSpace.user]: userData,
});

export type RootState = ReturnType<typeof rootReducer>;
