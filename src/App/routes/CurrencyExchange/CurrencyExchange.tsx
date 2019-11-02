import * as React from 'react';
import {useEffect} from 'react';
import {connect} from 'react-redux';
import selectors from './store/currency-exchange.selectors';
import actions from './store/currency-rate.actions';

type ICurrencyExchangeProps = typeof actions & ReturnType<typeof selectors>;

const CurrencyExchange = (props: ICurrencyExchangeProps) => {
    useEffect(() => {
        props.loadCurrenciesRates();
    });

    return (
        <div>CurrendcyExdgde</div>
    );
};

export default connect(selectors, actions)(CurrencyExchange);
