import {connect} from 'react-redux';
import {StoreRegistry} from '../../store/StoreRegistry';
import {currencyExchangeReducer} from './CurrencyExchange.reducer';
import {loadWallets} from './CurrencyExchange.actions';
import {ICurrencyExchangeProps} from './interfaces';
import CurrencyExchange from './CurrencyExchange';

StoreRegistry.registerReducer({
    exchange: currencyExchangeReducer
});

export default connect(null, {
    loadWallets
} as ICurrencyExchangeProps)(CurrencyExchange);
