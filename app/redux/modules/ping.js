import {mapTo, delay} from 'rxjs/operators';
import { ofType } from 'redux-observable';

export const pingEpic = action$ => action$.pipe(
    ofType('PING'),
    delay(1000), // Asynchronously wait 1000ms then continue
    mapTo({ type: 'PONG' })
);

export const pingReducer = (state = { isPinging: false }, action) => {
    switch (action.type) {
        case 'PING':
            return { isPinging: true };

        case 'PONG':
            return { isPinging: false };

        default:
            return state;
    }
};