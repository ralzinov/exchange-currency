import {IWallet} from './IWallet';

export interface ICurrencyExchangeState {
    isPending: boolean;
    wallets: IWallet[];
}
