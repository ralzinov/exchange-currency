import {IWallet} from './IWallet';

export interface ICurrencyExchangeState {
    isPending: boolean;
    wallets: IWallet[];
    exchangeRate: {
        base: string,
        timestamp: number,
        rates: Dict<number>
    }
}
