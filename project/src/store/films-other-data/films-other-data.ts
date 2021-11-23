import {FilmsOtherData} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {changeGenre, loadComments} from '../action';

const initialState: FilmsOtherData = {
  genre: 'All genres',
  comments: [],
};

const filmsOtherData = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    });
});

export {filmsOtherData};
