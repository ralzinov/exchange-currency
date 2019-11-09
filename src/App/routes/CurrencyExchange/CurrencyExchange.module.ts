import {connect} from 'react-redux';
import {ReducerRegistry} from '../../store/ReducerRegistry';
import {currencyExchangeReducer} from './CurrencyExchange.reducer';
import {loadWallets} from './CurrencyExchange.actions';
import {ICurrencyExchangeProps} from './interfaces';
import CurrencyExchange from './CurrencyExchange';

ReducerRegistry.register({
    exchange: currencyExchangeReducer
});

export default connect(null, {
    loadWallets
} as ICurrencyExchangeProps)(CurrencyExchange);
