import * as React from 'react';
import styles from './CurrencyExchange.module.css'
import CurrencyExchangeForm from './CurrencyExchangeForm';
import {ICurrencyExchangeProps} from './interfaces';
import {useEffect} from 'react';

const submitForm = (props: any) => {
    console.log(props);
};

const CurrencyExchange: React.FC<ICurrencyExchangeProps> = (props) => {
    useEffect(() => void props.loadWallets(), []);

    return (
        <div className={styles.host}>
            <h1>Transfer money</h1>
            <h4>Transfer money between wallets</h4>
            <div className={styles.card}>
                <CurrencyExchangeForm onSubmit={submitForm}/>
            </div>
        </div>
    );
};

export default CurrencyExchange;

