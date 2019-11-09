import * as React from 'react';
import {IWallet} from '../../../interfaces';
import {formatWalletValue} from '../../helpers';
import styles from './ExchangeRate.module.css';

export const ExchangeRate: React.FC<{source: IWallet; target: IWallet; rates: Dict<number>}> = (props) => {
    const {source, target, rates} = props;
    if (!source || !target) {
        return null;
    }

    const sourceFormatted = formatWalletValue({
        currency: source.currency,
        balance: 1
    });

    const targetFormatted = formatWalletValue({
        currency: target.currency,
        balance: rates[target.currency]
    });

    return (
        <div className={styles.host}>
            <span className={styles.exchangeRateLabel}>Exchange rate:</span>
            <span>{sourceFormatted} = {targetFormatted}</span>
        </div>
    );
};
