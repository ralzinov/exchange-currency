import {fromFetch} from 'rxjs/fetch';
import {combineLatest, empty, from, fromEvent, merge, of, throwError, timer} from 'rxjs';
import {ActionsObservable, ofType, StateObservable} from 'redux-observable';
import {
    catchError,
    exhaustMap,
    filter,
    map,
    mapTo,
    startWith,
    switchMap,
    take,
    takeUntil,
    withLatestFrom
} from 'rxjs/operators';
import {
    EXCHANGE_RATE_UPDATE_ERROR,
    LOAD_WALLETS,
    loadWallets,
    PAUSE_EXCHANGE_RATE_POLLING,
    pauseExchangeRatePolling,
    RESUME_EXCHANGE_RATE_POLLING,
    resumeExchangeRatePolling,
    RUN_EXCHANGE_RATE_POLLING,
    runExchangeRatePolling,
    STOP_EXCHANGE_RATE_POLLING,
    stopExchangeRatePolling
} from './CurrencyExchange.actions';
import {FORM_VALUE_SELECTOR_FACTORY} from './CurrencyExchange.reducer';
import {ICurrencyExchangeAPIResponse, IWallet} from './interfaces';
import {select} from '../../store';
import {Action} from 'redux';

const EXCHANGE_SERVER_URI = 'https://api.exchangerate-api.com/v4/latest/'; // TODO move to .env
const CURRENCY_EXCHANGE_POLLING_INTERVAL_MS = 1000;
const UNHANDLED_EXCEPTION_STATUS = -1;

const randomBalance = (decimals: number) => parseFloat((Math.random() * decimals * 10).toFixed(2));
const MOCK_WALLETS: IWallet[] = [{
    balance: randomBalance(4000),
    currency: 'USD',
}, {
    balance: randomBalance(10000),
    currency: 'RUB'
}, {
    balance: randomBalance(6000),
    currency: 'EUR'
}, {
    balance: randomBalance(3000),
    currency: 'GBP'
}];

export const loadWalletsEffect = (action$: ActionsObservable<ReturnType<typeof loadWallets>>) =>
    action$.pipe(
        ofType(LOAD_WALLETS),
        switchMap(({payload, onSuccess, onError}) => {
            // TODO Mocking API here
            // TODO make actual request
            // TODO handle error
            return timer(100).pipe(
                mapTo(onSuccess(MOCK_WALLETS))
            );
        })
    );

const formFieldValueFactory = (state$: StateObservable<object>, field: string) => {
    return select(state$, FORM_VALUE_SELECTOR_FACTORY(field)).pipe(
        filter((value) => Boolean(value)),
        map(({value}) => value.currency)
    );
};

const exchangeRatesRequestFactory = ({onSuccess, onError}: ReturnType<typeof runExchangeRatePolling>) =>
    (source: IWallet, target: IWallet) => fromFetch(`${EXCHANGE_SERVER_URI}${source}`).pipe(
        switchMap((response) => response.ok ? from(response.json()) : throwError(response)),
        map((data: ICurrencyExchangeAPIResponse) => {
            return onSuccess({
                timestamp: data.time_last_updated,
                rates: data.rates,
                base: data.base
            });
        }),
        catchError((response) => {
            return of(onError({
                status: response.status || UNHANDLED_EXCEPTION_STATUS,
                message: `Failed to convert ${source.currency} to ${target.currency}`
            }))
        })
    );

export const runExchangeRatePollingEpic = (
    action$: ActionsObservable<ReturnType<typeof runExchangeRatePolling>>,
    state$: StateObservable<object>
) => {
    const currencyPairValues$ = combineLatest(
        formFieldValueFactory(state$, 'source'),
        formFieldValueFactory(state$, 'target'),
    );

    return action$.pipe(ofType(RUN_EXCHANGE_RATE_POLLING)).pipe(
        switchMap((runAction) => {
            const request$ = exchangeRatesRequestFactory(runAction);
            return action$.pipe(
                ofType(PAUSE_EXCHANGE_RATE_POLLING, RESUME_EXCHANGE_RATE_POLLING),
                startWith(runAction),
                switchMap((action) => {
                    console.log(action);
                    if (action.type === PAUSE_EXCHANGE_RATE_POLLING) {
                        return empty();
                    }
                    return timer(0, CURRENCY_EXCHANGE_POLLING_INTERVAL_MS).pipe(
                        withLatestFrom(currencyPairValues$),
                        exhaustMap(([, [source, target]]) => request$(source, target)),
                        takeUntil(action$.pipe(ofType(STOP_EXCHANGE_RATE_POLLING)))
                    );
                })
            );
        })
    );
};

export const pauseExchangeRatePollingOnOfflineEpic = (action$: ActionsObservable<Action>) => {
    return action$.pipe(
        ofType(RUN_EXCHANGE_RATE_POLLING, RESUME_EXCHANGE_RATE_POLLING),
        switchMap((() => merge(
            of(navigator.onLine),
            fromEvent(window, 'offline').pipe(mapTo(false))
        ).pipe(
            filter((isOnline) => !isOnline),
            map(() => pauseExchangeRatePolling()),
            takeUntil(action$.pipe(ofType(STOP_EXCHANGE_RATE_POLLING))),
            take(1)
        )))
    );
};

export const resumeExchangeRatePollingOnOnlineEpic = (action$: ActionsObservable<Action>) => {
    return action$.pipe(
        ofType(PAUSE_EXCHANGE_RATE_POLLING),
        switchMap((() => merge(
            of(navigator.onLine),
            fromEvent(window, 'online').pipe(mapTo(true))
        ).pipe(
            filter(Boolean),
            map(() => resumeExchangeRatePolling()),
            takeUntil(action$.pipe(ofType(STOP_EXCHANGE_RATE_POLLING, RUN_EXCHANGE_RATE_POLLING))),
            take(1)
        )))
    );
};

export const stopExchangeRatePollingOnErrorEpic = (action$: ActionsObservable<Action>) => {
    return action$.pipe(
        ofType(EXCHANGE_RATE_UPDATE_ERROR),
        mapTo(stopExchangeRatePolling())
    );
};

