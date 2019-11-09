import * as React from 'react';
import {useEffect} from 'react';
import {Field, InjectedFormProps} from 'redux-form';
import {REQUIRED_VALIDATOR, SOURCE_AMOUNT_VALIDATORS} from './CurrencyExchangeForm.validators';
import {clearOppositeWalletWhenEqual, runExchangeRatePolling, setTargetWalletAmount} from './effects';
import {FormSelect} from '../../../../components/FormSelect';
import {FormInput} from '../../../../components/FormInput';
import {ICurrencyExchangeFormProps} from './interfaces';
import {Button} from '../../../../components/Button';
import {ExchangeRate} from './components/ExchangeRate';
import {amountParserFactory} from './helpers';
import {Balance} from './components/Balance';
import styles from './CurrencyExchangeForm.module.css';

const CurrencyExchangeForm: React.FC<InjectedFormProps & ICurrencyExchangeFormProps> = (props) => {
    const {handleSubmit, submitting, sourceValue, targetValue, exchangeRates, targetAmount, valid} = props;
    useEffect(() => runExchangeRatePolling(props), [sourceValue, targetValue]);
    useEffect(() => clearOppositeWalletWhenEqual(props));

    return (
        <form className={styles.host} onSubmit={props.handleSubmit}>
            <div className={styles.row}>
                <fieldset className={styles.cell}>
                    <legend>From</legend>
                    <Field
                        name="source"
                        placeholder="Select wallet"
                        className={styles.select}
                        options={props.sourceWallets}
                        validate={[REQUIRED_VALIDATOR]}
                        component={FormSelect}
                    />
                    <div className={styles.amountRow}>
                        <Field
                            type="text"
                            name="sourceAmount"
                            placeholder="0.00"
                            component={FormInput}
                            validate={SOURCE_AMOUNT_VALIDATORS}
                            parse={amountParserFactory(sourceValue)}
                            onChange={setTargetWalletAmount(props)}
                            disabled={!sourceValue}
                        />
                        <Balance value={sourceValue}/>
                    </div>
                </fieldset>
                <div className={styles.directionSymbol}/>
                <fieldset className={styles.cell}>
                    <legend>To</legend>
                    <Field
                        name="target"
                        placeholder="Select wallet"
                        className={styles.select}
                        options={props.targetWallets}
                        validate={[REQUIRED_VALIDATOR]}
                        component={FormSelect}
                    />
                    <div className={styles.amountRow}>
                        <Field
                            type="text"
                            name="targetAmount"
                            component={FormInput}
                            disabled
                            hidden
                        />
                        {targetAmount && valid && <div className={styles.targetAmountValue}>{targetAmount}</div>}
                        <Balance value={targetValue}/>
                    </div>
                </fieldset>
            </div>
            <div className={styles.row}>
                <div className={styles.cell}>
                    <ExchangeRate source={sourceValue} target={targetValue} rates={exchangeRates}/>
                </div>
                <div className={styles.cell}>
                    <Button
                        className={styles.submitButton}
                        onClick={handleSubmit}
                        disabled={submitting}
                    >Transfer</Button>
                </div>
            </div>
        </form>
    );
};

export default CurrencyExchangeForm;
