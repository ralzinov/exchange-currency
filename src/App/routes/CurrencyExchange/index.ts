import * as React from 'react';
import {ReducerRegistry} from '../../store/ReducerRegistry';

ReducerRegistry.register({
    exchange: require('./CurrencyExchange.reducer').currencyExchangeReducer
});

export default React.lazy(() => import('./CurrencyExchange'));


