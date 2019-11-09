import {StoreRegistry} from './StoreRegistry';
import {appReducer} from './reducers/app.reducer';
import {configureStore} from './configureStore';
import {isDevelopment} from '../../utils';

export default () => {
    /**
     * Store must have at least one reducer on start
     */
    StoreRegistry.registerReducer({appReducer});
    return configureStore();
};

isDevelopment() && module.hot && module.hot.accept('./reducers/app.reducer', () => {
    StoreRegistry.registerReducer(require('./reducers/app.reducer'));
});
