export interface ICurrencyExchangeAPIResponse {
    base: string;
    time_last_updated: number;
    date: string;
    rates: Dict<number>;
}
