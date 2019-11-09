import {IWallet} from './IWallet';

export interface ICurrencyExchangeReducerState {
    isPending: boolean;
    wallets: IWallet[];
    exchangeRate: {
        base: string,
        timestamp: number,
        rates: Dict<number>
    }
}
