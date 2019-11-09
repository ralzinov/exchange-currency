import {convert} from 'cashify';
import accounting from 'accounting'

interface IConvertCurrenciesProps {
    from: string;
    to: string;
    base: string;
    rates: Dict<number>;
    precision?: number;
}

export const convertCurrencies = (value: number, props: IConvertCurrenciesProps): string => {
    const {from, to, base, rates, precision = 2} = props;
    return accounting.toFixed(convert(value, {base, from, to, rates}), precision);
};
