import {ReducerRegistry} from '../../../store/ReducerRegistry';
import {isDevelopment} from '../../../../utils';

ReducerRegistry.register(require('./currency-exhange.reducer'));

isDevelopment() && module.hot && module.hot.accept('./currency-exhange.reducer', () => {
    ReducerRegistry.register(require('./currency-exhange.reducer'));
});
