import {reducer as formReducer} from 'redux-form';
import {createEpicMiddleware} from 'redux-observable';
import {applyMiddleware, combineReducers, createStore, Middleware, Reducer} from 'redux';
import {StoreRegistry} from './StoreRegistry';
import {isDevelopment} from '../../utils';

const configureReducers = (reducers: Dict<Reducer>) => {
    return combineReducers({
        ...reducers,
        form: formReducer
    });
};

const epicMiddleware = createEpicMiddleware();
const middlewares: Middleware[] = [
    epicMiddleware,
    !isDevelopment() ? null : require('redux-logger').createLogger({
        collapsed: true,
        duration: true
    }),
].filter(Boolean);

export function configureStore() {
    const rootReducer = configureReducers(StoreRegistry.getReducers());
    const store = applyMiddleware(...middlewares)(createStore)(rootReducer);

    // Reconfigure the store's reducer when the reducer registry is changed - we
    // depend on this for loading reducers via code splitting and for hot
    // reloading reducer modules.
    StoreRegistry.onChange((reducers) => {
        store.replaceReducer(configureReducers(reducers))
    });
    epicMiddleware.run(StoreRegistry.rootEpic);
    return store;
}
