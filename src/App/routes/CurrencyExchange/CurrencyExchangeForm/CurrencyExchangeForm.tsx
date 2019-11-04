import * as React from 'react';
import {required} from 'redux-form-validators'
import {Field, InjectedFormProps} from 'redux-form';
import styles from './CurrencyExchangeForm.module.css';
import {FormSelect, IFormSelectOption} from '../../../../components/FormSelect';
import {FormLabel} from '../../../../components/FormLabel';
import {FormInput} from '../../../../components/FormInput';
import {Button} from '../../../../components/Button';
import {ICurrencyExchangeFormProps} from './interfaces';
import {IWallet} from '../interfaces';

const mapWalletToOption = (wallet: IWallet): IFormSelectOption => {
    return {
        label: wallet.currency,
        value: wallet
    };
};

const requiredValidator = required({
    message: {defaultMessage: 'This field is required'}
});

const CurrencyExchangeForm: React.FC<InjectedFormProps & ICurrencyExchangeFormProps> = (props) => {
    const {handleSubmit, submitting} = props;
    console.log(props);

    return (
        <form className={styles.host} onSubmit={props.handleSubmit}>
            <div className={styles.row}>
                <div className={styles.cell}>
                    <FormLabel text="From">
                        <Field
                            name="source"
                            placeholder="Select wallet"
                            className={styles.select}
                            options={props.wallets.map(mapWalletToOption)}
                            validate={[requiredValidator]}
                            component={FormSelect}
                        />
                    </FormLabel>
                    <Field
                        name="sourceAmount"
                        placeholder="Amount"
                        component={FormInput}
                        validate={[requiredValidator]}
                        type="text"
                    />
                </div>
                <div className={styles.directionSymbol}/>
                <div className={styles.cell}>
                    <FormLabel text="To">
                        <Field
                            name="target"
                            placeholder="Select wallet"
                            className={styles.select}
                            options={props.wallets.map(mapWalletToOption)}
                            validate={[requiredValidator]}
                            component={FormSelect}
                        />
                    </FormLabel>
                    <Field
                        name="targetAmount"
                        placeholder="Amount"
                        component={FormInput}
                        validate={[requiredValidator]}
                        type="text"
                    />
                </div>
            </div>
            <div className={styles.row}>
                <Button
                    className={styles.submitButton}
                    onClick={handleSubmit}
                    disabled={submitting}
                >Transfer</Button>
            </div>
        </form>
    );
};

export default CurrencyExchangeForm;
