import accounting from 'accounting';
import {Currencies} from 'ts-money';
import {memoize} from '../../../../../utils';
import {IWallet} from '../../interfaces';

export const formatWalletValue = memoize((wallet: IWallet) => {
    if (wallet) {
        const currency = (Currencies as Dict<{ symbol: string }>)[wallet.currency];
        const symbol = currency ? currency.symbol : wallet.currency;
        const isSafeValue = Number.isSafeInteger(parseInt(`${wallet.balance}`, 10));
        return isSafeValue ? accounting.formatMoney(wallet.balance, symbol, 2) : wallet.balance;
    }
});
