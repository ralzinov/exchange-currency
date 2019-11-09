import {IFormSelectOption} from '../../../../../components/FormSelect';
import {IWallet} from '../../interfaces';

export interface ICurrencyExchangeFormSelectedProps {
    sourceWallets: IFormSelectOption[];
    targetWallets: IFormSelectOption[];
    sourceValue: IWallet;
    targetValue: IWallet;
    targetAmount: string;
    exchangeRates?: Dict<number>;
    isExchangeRatePollingEnabled: boolean;
}

export interface ICurrencyExchangeFormActions {
    runExchangeRatePolling: () => void;
    stopExchangeRatePolling: () => void;
}

export type ICurrencyExchangeFormProps = ICurrencyExchangeFormSelectedProps & ICurrencyExchangeFormActions;
