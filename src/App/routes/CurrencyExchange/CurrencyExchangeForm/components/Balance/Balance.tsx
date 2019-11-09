import * as React from 'react';
import {IWallet} from '../../../interfaces';
import {memoize} from '../../../../../../utils';
import {formatWalletValue} from '../../helpers';
import styles from './Balance.module.css';

export const Balance: React.FC<{ value: IWallet }> = memoize((props) => {
    return (
        <div className={styles.host}>
            {props.value && <span className={styles.balanceLabel}>You have:</span>}
            <span className={styles.balanceValue}>{formatWalletValue(props.value)}</span>
        </div>
    );
});
