import {IActionCreator, ISideEffectActionCreator} from '../../store/interfaces';
import {ICurrencyPairExchangeRate, IWallet, IAPIErrorResponse} from './interfaces';

export const LOAD_WALLETS = '[Currency] Load user wallets';
export const LOAD_WALLETS_ERROR = '[Currency] Failed to load user wallets';
export const LOAD_WALLETS_SUCCESS = '[Currency] User wallets loaded';

const loadWalletsSuccess: IActionCreator<IWallet[]> = (payload) => ({
    type: LOAD_WALLETS_SUCCESS,
    payload
});

const loadWalletsError: IActionCreator<IAPIErrorResponse> = (payload) => ({
    type: LOAD_WALLETS_ERROR,
    payload
});

export const loadWallets: ISideEffectActionCreator = () => ({
    onSuccess: loadWalletsSuccess,
    onError: loadWalletsError,
    type: LOAD_WALLETS
});

export const RUN_EXCHANGE_RATE_POLLING = '[Currency] Run exchange rate polling';
export const STOP_EXCHANGE_RATE_POLLING = '[Currency] Stop exchange rate polling';
export const PAUSE_EXCHANGE_RATE_POLLING = '[Currency] Pause exchange rate polling';
export const RESUME_EXCHANGE_RATE_POLLING = '[Currency] Resume exchange rate polling';
export const EXCHANGE_RATE_UPDATE_SUCCESS = '[Currency] Exchange rate update success';
export const EXCHANGE_RATE_UPDATE_ERROR = '[Currency] Exchange rate update error';

const exchangeRateUpdateSuccess: IActionCreator<ICurrencyPairExchangeRate> = (payload) => ({
    type: EXCHANGE_RATE_UPDATE_SUCCESS,
    payload
});

const exchangeRateUpdateError: IActionCreator<IAPIErrorResponse> = (payload) => ({
    type: EXCHANGE_RATE_UPDATE_ERROR,
    payload
});

export const runExchangeRatePolling: ISideEffectActionCreator<never, ICurrencyPairExchangeRate, IAPIErrorResponse> = () => ({
    onSuccess: exchangeRateUpdateSuccess,
    onError: exchangeRateUpdateError,
    type: RUN_EXCHANGE_RATE_POLLING
});

export const stopExchangeRatePolling: IActionCreator = () => ({
    type: STOP_EXCHANGE_RATE_POLLING
});

export const pauseExchangeRatePolling: IActionCreator = () => ({
    type: PAUSE_EXCHANGE_RATE_POLLING
});

export const resumeExchangeRatePolling: IActionCreator = () => ({
    type: RESUME_EXCHANGE_RATE_POLLING
});


export type ICurrencyRatesActions =
    ReturnType<typeof runExchangeRatePolling> |
    ReturnType<typeof stopExchangeRatePolling> |
    ReturnType<typeof exchangeRateUpdateSuccess> |
    ReturnType<typeof exchangeRateUpdateError> |
    ReturnType<typeof loadWallets> |
    ReturnType<typeof loadWalletsSuccess> |
    ReturnType<typeof loadWalletsError>;
