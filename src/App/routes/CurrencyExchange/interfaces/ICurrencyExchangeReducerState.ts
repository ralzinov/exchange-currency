import {IWallet} from './IWallet';
import {IAPIErrorResponse} from './IAPIErrorResponse';

export interface ICurrencyPairExchangeRate {
    timestamp: number;
    rates: Dict<number>;
    base: string;
}

export interface ICurrencyExchangeReducerState {
    isWalletsLoadPending: boolean;
    isExchangeRatePollingEnabled: boolean;
    wallets: IWallet[];
    walletsLoadError?: IAPIErrorResponse;
    exchangeRate?: ICurrencyPairExchangeRate;
    exchangeRateError?: IAPIErrorResponse;
}
