import {createSelector} from 'reselect';
import {formValueSelector} from 'redux-form';
import {IAPIErrorResponse, ICurrencyExchangeReducerState, ICurrencyPairExchangeRate, IWallet} from './interfaces';
import {
    EXCHANGE_RATE_UPDATE_ERROR,
    EXCHANGE_RATE_UPDATE_SUCCESS,
    ICurrencyRatesActions,
    LOAD_WALLETS,
    LOAD_WALLETS_ERROR,
    LOAD_WALLETS_SUCCESS,
    RUN_EXCHANGE_RATE_POLLING,
    STOP_EXCHANGE_RATE_POLLING
} from './CurrencyExchange.actions';
import {IFormSelectOption} from '../../../components/FormSelect';
import {memoize} from '../../../utils';

export const EXCHANGE_FORM_NAME = 'exchange';

const initialState: ICurrencyExchangeReducerState = {
    isWalletsLoadPending: false,
    isExchangeRatePollingEnabled: false,
    wallets: []
};

export function currencyExchangeReducer(
    state: ICurrencyExchangeReducerState = initialState,
    action: ICurrencyRatesActions
): ICurrencyExchangeReducerState {
    switch (action.type) {
        case LOAD_WALLETS: {
            return {
                ...state,
                isWalletsLoadPending: true,
            };
        }

        case LOAD_WALLETS_SUCCESS: {
            return {
                ...state,
                isWalletsLoadPending: false,
                wallets: action.payload as IWallet[]
            };
        }

        case LOAD_WALLETS_ERROR: {
            return {
                ...state,
                walletsLoadError: action.payload as IAPIErrorResponse,
                isWalletsLoadPending: false,
            };
        }

        case EXCHANGE_RATE_UPDATE_SUCCESS: {
            return {
                ...state,
                exchangeRate: action.payload as ICurrencyPairExchangeRate
            };
        }

        case EXCHANGE_RATE_UPDATE_ERROR: {
            return {
                ...state,
                exchangeRateError: action.payload as IAPIErrorResponse,
                isExchangeRatePollingEnabled: false
            };
        }

        case RUN_EXCHANGE_RATE_POLLING: {
            return {
                ...state,
                isExchangeRatePollingEnabled: true
            };
        }

        case STOP_EXCHANGE_RATE_POLLING: {
            return {
                ...state,
                isExchangeRatePollingEnabled: false
            };
        }

        default: return state;
    }
}

const EXCHANGE_STATE_SELECTOR = (state: { exchange: ICurrencyExchangeReducerState }) => state.exchange;

export const EXCHANGE_POLLING_ENABLED_SELECTOR = createSelector(
    EXCHANGE_STATE_SELECTOR,
    (exchange) => {
        return exchange && exchange.isExchangeRatePollingEnabled;
    }
);

export const WALLETS_EXCHANGE_RATES_SELECTOR = createSelector(
    EXCHANGE_STATE_SELECTOR,
    (exchange) => exchange && exchange.exchangeRate && exchange.exchangeRate.rates
);

export const FORM_VALUE_SELECTOR_FACTORY = (field: string) => (state: object) => {
    return formValueSelector(EXCHANGE_FORM_NAME)(state, field);
};

const mapWalletToOption = memoize((wallet: IWallet): IFormSelectOption => {
    return {
        label: wallet.currency,
        value: wallet
    };
});

const WALLETS_SELECTOR = createSelector(
    EXCHANGE_STATE_SELECTOR,
    (exchange) => exchange && exchange.wallets
);

export const WALLETS_OPTIONS_SELECTOR_FACTORY = (fieldName: string) => createSelector(
    WALLETS_SELECTOR,
    FORM_VALUE_SELECTOR_FACTORY(fieldName),
    (wallets, source: IWallet) => {
        return wallets
            .filter((wallet) => wallet !== source)
            .map(mapWalletToOption);
    }
);

