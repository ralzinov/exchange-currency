import {EventWithDataHandler, InjectedFormProps} from 'redux-form';
import {ICurrencyExchangeFormProps} from '../interfaces';
import {ChangeEvent} from 'react';
import {convertCurrencies} from '../helpers';

export const setTargetWalletAmount = (props: InjectedFormProps & ICurrencyExchangeFormProps): EventWithDataHandler<ChangeEvent<any>> =>
    (event, value, previousValue, name) => {
        const {sourceValue, targetValue, exchangeRates} = props;
        if (name !== 'sourceAmount' || isNaN(parseFloat(value)) || !sourceValue || !targetValue || !exchangeRates) {
            props.change('targetAmount', null);
            return;
        }
        const targetAmountValue = convertCurrencies(value, {
            base: sourceValue.currency,
            from: sourceValue.currency,
            to: targetValue.currency,
            rates: exchangeRates
        });
        props.change('targetAmount', targetAmountValue);
    };
