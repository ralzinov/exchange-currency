import {timer} from 'rxjs';
import {mapTo, switchMap} from 'rxjs/operators';
import {ActionsObservable, ofType} from 'redux-observable';
import {LOAD_WALLETS, loadWallets} from './CurrencyExchange.actions';
import {IWallet} from './interfaces';

const MOCK_WALLETS: IWallet[] = [{
    balance: 403.3,
    currency: 'USD',
}, {
    balance: 100001.39,
    currency: 'RUB'
}, {
    balance: 122.45,
    currency: 'EUR'
}, {
    balance: 88.1,
    currency: 'GBP'
}];

export const loadWalletsEpic = (action$: ActionsObservable<ReturnType<typeof loadWallets>>) => action$.pipe(
    ofType(LOAD_WALLETS),
    switchMap((action) => {
        // TODO Mock API
        return timer(100).pipe(
            mapTo(action.onSuccess(MOCK_WALLETS))
        );
    })
);
