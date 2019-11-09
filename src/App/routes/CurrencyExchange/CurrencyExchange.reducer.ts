import {createSelector} from 'reselect';
import {formValueSelector} from 'redux-form';
import {ICurrencyExchangeReducerState, IWallet} from './interfaces';
import {
    AMOUNT_FIELD_CHANGE,
    ICurrencyRatesActions,
    LOAD_WALLETS,
    LOAD_WALLETS_ERROR,
    LOAD_WALLETS_SUCCESS
} from './CurrencyExchange.actions';
import {IFormSelectOption} from '../../../components/FormSelect';
import {memoize} from '../../../utils';

export const EXCHANGE_FORM_NAME = 'exchange';

const initialState: ICurrencyExchangeReducerState = {
    isPending: false,
    exchangeRate: {
        timestamp: 112358,
        base: 'USD',
        rates: {
            USD: 0.0156613,
            RUB: 63.8517
        }
    },
    wallets: [{
        balance: 403.3,
        currency: 'USD',
    }, {
        balance: 100001.39,
        currency: 'RUB'
    }, {
        balance: 122.45,
        currency: 'EUR'
    }, {
        balance: 88.1,
        currency: 'GBP'
    }]
};

export function currencyExchangeReducer(state: ICurrencyExchangeReducerState = initialState, action: ICurrencyRatesActions) {
    switch (action.type) {
        case LOAD_WALLETS: {
            return {
                ...state,
                isPending: true,
            };
        }

        case LOAD_WALLETS_SUCCESS: {
            return {
                ...state,
                isPending: false,
                wallets: action.payload
            };
        }

        case LOAD_WALLETS_ERROR: {
            return {
                ...state,
                isPending: false
            };
        }

        case AMOUNT_FIELD_CHANGE: {
            return {
                ...state,
                lastChangedAmountField: action.payload
            };
        }

        default: return state;
    }
}

const EXCHANGE_STATE_SELECTOR = (state: {exchange: ICurrencyExchangeReducerState}) => state.exchange;

export const WALLETS_EXCHANGE_RATES_SELECTOR = createSelector(
    EXCHANGE_STATE_SELECTOR,
    ({exchangeRate}) => exchangeRate.rates
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
    ({wallets}) => wallets
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

