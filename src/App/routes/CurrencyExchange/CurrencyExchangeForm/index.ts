import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {
    EXCHANGE_FORM_NAME,
    EXCHANGE_POLLING_ENABLED_SELECTOR,
    FORM_VALUE_SELECTOR_FACTORY,
    WALLETS_EXCHANGE_RATES_SELECTOR,
    WALLETS_OPTIONS_SELECTOR_FACTORY
} from '../CurrencyExchange.reducer';
import CurrencyExchangeForm from './CurrencyExchangeForm';
import {ICurrencyExchangeReducerState} from '../interfaces';
import {ICurrencyExchangeFormActions, ICurrencyExchangeFormSelectedProps} from './interfaces';
import {runExchangeRatePolling, stopExchangeRatePolling} from '../CurrencyExchange.actions';

const Component = connect((state: { exchange: ICurrencyExchangeReducerState }): ICurrencyExchangeFormSelectedProps => {
    const sourceWallet = FORM_VALUE_SELECTOR_FACTORY('source')(state);
    const targetWallet = FORM_VALUE_SELECTOR_FACTORY('target')(state);
    return {
        sourceWallets: WALLETS_OPTIONS_SELECTOR_FACTORY('source')(state),
        targetWallets: WALLETS_OPTIONS_SELECTOR_FACTORY('target')(state),
        targetAmount: FORM_VALUE_SELECTOR_FACTORY('targetAmount')(state),
        isExchangeRatePollingEnabled: EXCHANGE_POLLING_ENABLED_SELECTOR(state),
        exchangeRates: WALLETS_EXCHANGE_RATES_SELECTOR(state),
        sourceValue: sourceWallet && sourceWallet.value,
        targetValue: targetWallet && targetWallet.value,
    }
}, {
    runExchangeRatePolling,
    stopExchangeRatePolling
} as ICurrencyExchangeFormActions)(CurrencyExchangeForm);

export default reduxForm({
    form: EXCHANGE_FORM_NAME,
})(Component);

