import accounting from 'accounting';
import {Currencies} from 'ts-money';
import {memoize} from '../../../../../utils';
import {IWallet} from '../../interfaces';

const DEFAULT_CURRENCY_PRECISION = 2; // TODO move to .env

export const formatWalletValue = memoize((wallet: IWallet, precision: number = DEFAULT_CURRENCY_PRECISION) => {
    if (wallet) {
        const currency = (Currencies as Dict<{ symbol: string }>)[wallet.currency];
        const symbol = currency ? currency.symbol : wallet.currency;
        const isSafeValue = Number.isSafeInteger(parseInt(`${wallet.balance}`, 10));
        return isSafeValue ? accounting.formatMoney(wallet.balance, symbol, precision) : wallet.balance;
    }
});
