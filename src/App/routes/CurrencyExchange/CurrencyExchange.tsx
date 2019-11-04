import * as React from 'react';
import styles from './CurrencyExchange.module.css'
import CurrencyExchangeForm from './CurrencyExchangeForm';

const submitForm = (props: any) => {
    console.log(props);
};

const CurrencyExchange: React.FC = () => {
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
