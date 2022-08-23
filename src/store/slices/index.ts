import {combineReducers} from '@reduxjs/toolkit';

export const globalState = {};

export const globalReducer = {};

const rootReducer = combineReducers(globalReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;