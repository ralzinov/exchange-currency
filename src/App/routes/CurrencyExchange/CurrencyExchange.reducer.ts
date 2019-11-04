import {createSelector} from 'reselect';
import {ICurrencyExchangeState} from './interfaces/ICurrencyExchangeState';
import {ICurrencyRatesActions, LOAD_WALLETS, LOAD_WALLETS_SUCCESS, LOAD_WALLETS_ERROR} from './CurrencyExchange.actions';

const initialState: ICurrencyExchangeState = {
    isPending: false,
    wallets: [{
        balance: 100,
        currency: 'USD',
    }, {
        balance: 110,
        currency: 'RUB'
    }, {
        balance: 120,
        currency: 'EUR'
    }, {
        balance: 130,
        currency: 'GBP'
    }]
};

export function currencyExchangeReducer(state: ICurrencyExchangeState = initialState, action: ICurrencyRatesActions) {
    switch (action.type) {
        case LOAD_WALLETS:
            return {
                ...state,
                isPending: true,
            };

        case LOAD_WALLETS_SUCCESS:
            return {
                ...state,
                isPending: false,
                wallets: action.payload
            };

        case LOAD_WALLETS_ERROR:
            return {
                ...state,
                isPending: false
            };

        default: return state;
    }
}

export const EXCHANGE_STATE_SELECTOR = (state: {exchange: ICurrencyExchangeState}) => state.exchange;

export const WALLETS_SELECTOR = createSelector(
    EXCHANGE_STATE_SELECTOR,
    (exchangeState: ICurrencyExchangeState) => exchangeState.wallets
);
