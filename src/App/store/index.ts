import {map} from 'rxjs/operators';
import {StateObservable} from 'redux-observable';
import {appReducer} from './reducers/app.reducer';
import {configureStore} from './configureStore';
import {StoreRegistry} from './StoreRegistry';
import {isDevelopment} from '../../utils';

/**
 * Store select operator
 * @param state$
 * @param selector
 */
export const select= <T extends object, R>(state$: StateObservable<T>, selector: (value: T, index: number) => R) => {
    return state$.pipe(map<T, R>(selector));
};

export default () => {
    /**
     * Store must have at least one reducer on start
     */
    StoreRegistry.registerReducers({appReducer});
    return configureStore();
};

isDevelopment() && module.hot && module.hot.accept('./reducers/app.reducer', () => {
    StoreRegistry.registerReducers(require('./reducers/app.reducer'));
});
