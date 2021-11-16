import {FilmsData} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {loadFilms, loadCurrentFilm, loadSimilarFilms} from '../action';

const initialState: FilmsData = {
  films: [],
  similarFilms: [],
  currentFilm: {
    'id': 0,
    'name': '',
    'poster_image': '',
    'preview_image': '',
    'background_image': '',
    'background_color': '',
    'video_link': '',
    'preview_video_link': '',
    'description': '',
    'rating': 0,
    'scores_count': 0,
    'director': '',
    'starring': [],
    'run_time': 0,
    'genre': '',
    'released': 0,
    'is_favorite': false,
  },
};

const filmsData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(loadCurrentFilm, (state, action) => {
      state.currentFilm = action.payload;
    })
    .addCase(loadSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    });
});

export {filmsData};
