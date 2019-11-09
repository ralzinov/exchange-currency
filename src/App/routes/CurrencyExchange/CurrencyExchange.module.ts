import {connect} from 'react-redux';
import {StoreRegistry} from '../../store/StoreRegistry';
import {currencyExchangeReducer} from './CurrencyExchange.reducer';
import {
    loadWalletsEffect,
    exchangeRatePollingEffect,
    cancelExchangeRatePollingOnErrorEffect,
} from './CurrencyExchange.effects';
import {loadWallets} from './CurrencyExchange.actions';
import {ICurrencyExchangeProps} from './interfaces';
import CurrencyExchange from './CurrencyExchange';

StoreRegistry.registerReducer({
    exchange: currencyExchangeReducer
});

StoreRegistry.registerEpic(loadWalletsEffect);
StoreRegistry.registerEpic(exchangeRatePollingEffect);
StoreRegistry.registerEpic(cancelExchangeRatePollingOnErrorEffect);

export default connect(null, {
    loadWallets
} as ICurrencyExchangeProps)(CurrencyExchange);
