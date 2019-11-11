import {connect} from 'react-redux';
import {StoreRegistry} from '../../store/StoreRegistry';
import {currencyExchangeReducer} from './CurrencyExchange.reducer';
import {
    loadWalletsEffect,
    runExchangeRatePollingEpic,
    stopExchangeRatePollingOnErrorEpic,
    pauseExchangeRatePollingOnOfflineEpic,
    resumeExchangeRatePollingOnOnlineEpic,
} from './CurrencyExchange.effects';
import {loadWallets} from './CurrencyExchange.actions';
import {ICurrencyExchangeProps} from './interfaces';
import CurrencyExchange from './CurrencyExchange';

StoreRegistry.registerReducer({
    exchange: currencyExchangeReducer
});

StoreRegistry.registerEpic(loadWalletsEffect);
StoreRegistry.registerEpic(runExchangeRatePollingEpic);
StoreRegistry.registerEpic(resumeExchangeRatePollingOnOnlineEpic);
StoreRegistry.registerEpic(pauseExchangeRatePollingOnOfflineEpic);
StoreRegistry.registerEpic(stopExchangeRatePollingOnErrorEpic);

export default connect(null, {
    loadWallets
} as ICurrencyExchangeProps)(CurrencyExchange);
