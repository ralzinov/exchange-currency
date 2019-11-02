import {ReducerRegistry} from './ReducerRegistry';
import {appReducer} from './reducers/app.reducer';
import {configureStore} from './configureStore';
import {isDevelopment} from '../../utils';

export default () => {
    /**
     * Store must have at least one reducer on start
     */
    ReducerRegistry.register({appReducer});
    return configureStore();
};

isDevelopment() && module.hot && module.hot.accept('./reducers/app.reducer', () => {
    ReducerRegistry.register(require('./reducers/app.reducer'));
});
