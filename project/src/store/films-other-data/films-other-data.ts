import {FilmsOtherData} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {changeGenre, loadComments, showMoreFilms} from '../action';

const FILMS_IN_LIST_STEP = 8;

const initialState: FilmsOtherData = {
  genre: 'All genres',
  comments: [],
  count: FILMS_IN_LIST_STEP,
};

const filmsOtherData = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(showMoreFilms, (state) => {
      state.count += 1;
    });
});

export {filmsOtherData};
