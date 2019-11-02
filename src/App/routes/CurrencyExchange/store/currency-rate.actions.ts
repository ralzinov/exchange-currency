import {IActionCreator} from '../../../store/interfaces';

export const LOAD_CURRENCIES_RATES = '[Currency] Load currencies rates';

const loadCurrenciesRates: IActionCreator = (payload) => ({
    type: LOAD_CURRENCIES_RATES,
    payload
});

export default {
    loadCurrenciesRates
}
