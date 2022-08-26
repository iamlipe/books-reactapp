import {combineReducers} from '@reduxjs/toolkit';

import user, {userState} from './userSlice';
import book, {bookState} from './bookSlice';

export const globalState = {user: userState, book: bookState};

export const globalReducer = {user, book};

const rootReducer = combineReducers(globalReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
