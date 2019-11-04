import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {WALLETS_SELECTOR} from '../CurrencyExchange.reducer';
import CurrencyExchangeForm from './CurrencyExchangeForm';
import {ICurrencyExchangeState} from '../interfaces/ICurrencyExchangeState';
import {CurrencyExchangeFormValidator} from './CurrencyExchangeForm.validator';

const Component = connect((state: { exchange: ICurrencyExchangeState }) => {
    return {
        wallets: WALLETS_SELECTOR(state)
    }
})(CurrencyExchangeForm);

export default reduxForm({
    form: 'currency-exchange',
    validate: CurrencyExchangeFormValidator
})(Component);
