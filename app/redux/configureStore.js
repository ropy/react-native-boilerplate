import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import {persistReducer} from 'redux-persist';
import storage from "redux-persist/es/storage";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {createLogger} from "redux-logger";

import { configureAxiosMiddleware } from './configureAxiosMiddleware';
import { rootEpic, rootReducer } from './modules/root';

const epicMiddleware = createEpicMiddleware();

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

const loggerMiddleware = createLogger({predicate: (getState, action) => __DEV__});

const persistConfig = {
    key: 'root',
    timeout: 10000,
    storage,
    stateReconciler: autoMergeLevel2
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const axiosMiddleWare = configureAxiosMiddleware();

const enhancer = composeEnhancers(
    applyMiddleware(
        epicMiddleware,
        axiosMiddleWare,
        loggerMiddleware
    )
);

export default function configureStore() {
    const store = createStore(
        persistedReducer,
        enhancer
    );

    epicMiddleware.run(rootEpic);

    return store;
}