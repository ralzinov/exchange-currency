import {connect} from 'react-redux';
import {StoreRegistry} from '../../store/StoreRegistry';
import {currencyExchangeReducer} from './CurrencyExchange.reducer';
import {loadWallets} from './CurrencyExchange.actions';
import {ICurrencyExchangeProps} from './interfaces';
import CurrencyExchange from './CurrencyExchange';
import {loadWalletsEpic} from './CurrencyExchange.effects';

StoreRegistry.registerReducer({
    exchange: currencyExchangeReducer
});

StoreRegistry.registerEpic(loadWalletsEpic);

export default connect(null, {
    loadWallets
} as ICurrencyExchangeProps)(CurrencyExchange);
