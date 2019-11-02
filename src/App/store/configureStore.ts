import thunkMiddleware from 'redux-thunk';
import {applyMiddleware, combineReducers, createStore, Middleware, Reducer} from 'redux';
import {ReducerRegistry} from './ReducerRegistry';
import {isDevelopment} from '../../utils';

const configureReducers = (reducers: Dict<Reducer>) => {
    return combineReducers({...reducers});
};

const middlewares: Middleware[] = [
    !isDevelopment() ? null : require('redux-logger').createLogger({
        collapsed: true,
        duration: true
    }),
    thunkMiddleware
].filter(Boolean);

export function configureStore() {
    const rootReducer = configureReducers(ReducerRegistry.getReducers());
    const store = applyMiddleware(...middlewares)(createStore)(rootReducer);

    // Reconfigure the store's reducer when the reducer registry is changed - we
    // depend on this for loading reducers via code splitting and for hot
    // reloading reducer modules.
    ReducerRegistry.onChange((reducers) => {
        store.replaceReducer(configureReducers(reducers))
    });

    return store;
}
