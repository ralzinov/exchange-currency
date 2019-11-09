import {IFormSelectOption} from '../../../../../components/FormSelect';
import {IWallet} from '../../interfaces';

export interface ICurrencyExchangeFormProps {
    sourceWallets: IFormSelectOption[];
    targetWallets: IFormSelectOption[];
    sourceValue: IWallet;
    targetValue: IWallet;
    targetAmount: string;
    exchangeRates: Dict<number>;
}
