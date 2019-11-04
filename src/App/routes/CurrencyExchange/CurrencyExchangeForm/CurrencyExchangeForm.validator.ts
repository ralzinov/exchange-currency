import {ConfigProps} from 'redux-form';

export const CurrencyExchangeFormValidator: ConfigProps['validate'] = (value: any) => {
    console.log(value);
    return {};
};
