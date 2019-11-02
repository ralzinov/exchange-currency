import {Action} from 'redux';

/**
 * App wide reducer
 * @param state
 * @param action
 */
export function currencyExchangeReducer(state: object = {}, action: Action) {
    console.log('currencyExchangeReducer', action);
    return state;
}
