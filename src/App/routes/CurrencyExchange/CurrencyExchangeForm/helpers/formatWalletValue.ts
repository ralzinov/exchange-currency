import accounting from 'accounting';
import {Currencies} from 'ts-money';
import {memoize} from '../../../../../utils';
import {IWallet} from '../../interfaces';

export const formatWalletValue = memoize((wallet: IWallet) => {
    if (wallet) {
        const currency = (Currencies as Dict<{ symbol: string }>)[wallet.currency];
        const symbol = currency ? currency.symbol : wallet.currency;
        return accounting.formatMoney(wallet.balance, symbol, 2);
    }
});
