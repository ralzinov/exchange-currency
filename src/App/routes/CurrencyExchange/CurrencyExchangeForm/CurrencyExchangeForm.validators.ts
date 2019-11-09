import {Money} from 'ts-money';
import {numericality, required, Validator} from 'redux-form-validators';
import {formatWalletValue} from './helpers';

export const REQUIRED_VALIDATOR = required({
    message: {defaultMessage: 'This field is required'}
});

const AMOUNT_VALIDATORS = [
    REQUIRED_VALIDATOR,
    numericality({message: {defaultMessage: 'Value must be a number'}}),
    numericality({
        message: {defaultMessage: 'Value must be a greater than zero'},
        greaterThan: 0
    })
];

export const SOURCE_AMOUNT_VALIDATORS: Validator[] = [
    ...AMOUNT_VALIDATORS,
    (value, allValues) => {
        const wallet = allValues.source && allValues.source.value;
        if (!wallet) {
            return;
        }
        const balance = Money.fromDecimal(wallet.balance, wallet.currency, Math.floor);
        const amount =  Money.fromDecimal(value, wallet.currency, Math.floor);
        return (balance.compare(amount) >= 0) ? null : `Value should be less or equal ${formatWalletValue(wallet)}`;
    }
];

