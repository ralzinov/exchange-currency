import {Parser} from 'redux-form';
import {memoize} from '../../../../../utils';
import {IWallet} from '../../interfaces';

export const amountParserFactory = memoize((wallet: IWallet): Parser => (value: string) => {
    if (wallet && !isNaN(parseFloat(value)) && `${value}`.match(/\.\d\d+$/)) {
        return value.replace(/(\d+)\.(\d\d)\d+/, '$1.$2');
    }
    return value;
});
