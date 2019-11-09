import * as React from 'react';
import {ChangeEvent, useEffect} from 'react';
import {EventWithDataHandler, Field, InjectedFormProps} from 'redux-form';
import {REQUIRED_VALIDATOR, SOURCE_AMOUNT_VALIDATORS} from './CurrencyExchangeForm.validators';
import {clearOppositeWalletWhenEqual} from './effects/clearOppositeWalletWhenEqual';
import {amountParserFactory, convertCurrencies} from './helpers';
import {FormSelect} from '../../../../components/FormSelect';
import {FormInput} from '../../../../components/FormInput';
import {ICurrencyExchangeFormProps} from './interfaces';
import {Button} from '../../../../components/Button';
import {ExchangeRate} from './components/ExchangeRate';
import {Balance} from './components/Balance';
import styles from './CurrencyExchangeForm.module.css';

type IProps = InjectedFormProps & ICurrencyExchangeFormProps;

const setTargetWalletAmount = (props: IProps): EventWithDataHandler<ChangeEvent<any>> =>
    (event, value, previousValue, name) => {
        const {sourceValue, targetValue} = props;
        if (name !== 'sourceAmount' || isNaN(parseFloat(value)) || !sourceValue || !targetValue) {
            props.change('targetAmount', null);
            return;
        }
        const targetAmountValue = convertCurrencies(value, {
            base: props.sourceValue.currency,
            from: props.sourceValue.currency,
            to: props.targetValue.currency,
            rates: props.exchangeRates
        });
        props.change('targetAmount', targetAmountValue);
    };

const CurrencyExchangeForm: React.FC<IProps> = (props) => {
    const {handleSubmit, submitting, sourceValue, targetValue, exchangeRates, targetAmount, valid} = props;
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
