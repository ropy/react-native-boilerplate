import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import {pingReducer, pingEpic } from './ping';
// import users, { fetchUserEpic } from './users';

export const rootEpic = combineEpics(
    pingEpic,
    // fetchUserEpic
);

export const rootReducer = combineReducers({
    pingReducer,
    // users
});