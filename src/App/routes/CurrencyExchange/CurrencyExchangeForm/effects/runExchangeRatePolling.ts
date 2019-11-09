import {InjectedFormProps} from 'redux-form';
import {ICurrencyExchangeFormProps} from '../interfaces';

export const runExchangeRatePolling = (props: InjectedFormProps & ICurrencyExchangeFormProps) => {
    const {sourceValue, targetValue, runExchangeRatePolling, stopExchangeRatePolling} = props;
    if (sourceValue && targetValue) {
        runExchangeRatePolling()
    } else if (props.isExchangeRatePollingEnabled) {
        stopExchangeRatePolling();
    }
};
