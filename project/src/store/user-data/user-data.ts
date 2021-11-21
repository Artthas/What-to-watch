import {UserData} from '../../types/state';
import {AuthorizationStatus} from '../../const';
import {createReducer} from '@reduxjs/toolkit';
import {saveUserAvatarUrl, requireAuthorization, requireLogout} from '../action';

const initialState: UserData = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  userAvatarUrl: '',
};

const userData = createReducer(initialState, (builder) => {
  builder
    .addCase(saveUserAvatarUrl, (state, action) => {
      state.userAvatarUrl = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(requireLogout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
});

export {userData};
