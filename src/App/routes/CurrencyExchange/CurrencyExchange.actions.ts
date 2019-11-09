import {IActionCreator, ISideEffectActionCreator} from '../../store/interfaces';
import {IWallet} from './interfaces';


export const LOAD_CURRENCY_RATES = '[Currency] Load currency rate';
export const LOAD_CURRENCY_RATES_SUCCESS = '[Currency] Currency rate loaded';
export const LOAD_CURRENCY_RATES_ERROR = '[Currency] Failed to load currency rate';

export const LOAD_WALLETS = '[Currency] Load user wallets';
export const LOAD_WALLETS_ERROR = '[Currency] Failed to load user wallets';
export const LOAD_WALLETS_SUCCESS = '[Currency] User wallets loaded';
export const AMOUNT_FIELD_CHANGE = '[Currency form] Amount field change';

const loadCurrencyRatesSuccess: IActionCreator<any> = () => ({
    type: LOAD_CURRENCY_RATES_SUCCESS
});

const loadCurrencyRatesError: IActionCreator<any> = () => ({
    type: LOAD_CURRENCY_RATES_ERROR
});

export const loadCurrencyRates: ISideEffectActionCreator<{base: string; target: string}> = (payload) => ({
    onSuccess: loadCurrencyRatesSuccess,
    onError: loadCurrencyRatesError,
    type: LOAD_CURRENCY_RATES,
    payload
});


const loadWalletsSuccess: IActionCreator<IWallet[]> = (payload) => ({
    type: LOAD_WALLETS_SUCCESS,
    payload
});

const loadWalletsError: IActionCreator<{}> = (payload) => ({
    type: LOAD_WALLETS_ERROR,
    payload
});

export const loadWallets: ISideEffectActionCreator = () => ({
    onSuccess: loadWalletsSuccess,
    onError: loadWalletsError,
    type: LOAD_WALLETS
});

export const amountFieldChange: IActionCreator<string> = (payload) => ({
    type: AMOUNT_FIELD_CHANGE,
    payload
});


export type ICurrencyRatesActions =
    ReturnType<typeof amountFieldChange> |
    ReturnType<typeof loadCurrencyRates> |
    ReturnType<typeof loadWallets>;
