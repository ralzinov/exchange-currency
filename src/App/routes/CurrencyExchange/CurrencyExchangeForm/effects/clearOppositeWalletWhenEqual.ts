import find from 'lodash/find';
import {IWallet} from '../../interfaces';
import {InjectedFormProps} from 'redux-form';
import {ICurrencyExchangeFormProps} from '../interfaces';

const prevValuesCache: Dict<IWallet> = {};
export const clearOppositeWalletWhenEqual = (props: InjectedFormProps & ICurrencyExchangeFormProps) => {
    const {sourceValue, targetValue, targetWallets, sourceWallets, initialize} = props;
    if (sourceValue && sourceValue === targetValue) {
        if (sourceValue !== prevValuesCache.sourceValue) {
            initialize({
                source: find(targetWallets, {value: sourceValue}),
                targetAmount: null,
                target: null
            });
        } else if (targetValue !== prevValuesCache.targetValue) {
            initialize({
                target: find(sourceWallets, {value: targetValue}),
                sourceAmount: null,
                source: null
            });
        }
    }
    prevValuesCache.targetValue = targetValue;
    prevValuesCache.sourceValue = sourceValue;
};
