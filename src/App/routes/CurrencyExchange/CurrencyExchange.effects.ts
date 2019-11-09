import {timer} from 'rxjs';
import {mapTo, switchMap} from 'rxjs/operators';
import {ActionsObservable, ofType} from 'redux-observable';
import {LOAD_WALLETS, loadWallets} from './CurrencyExchange.actions';
import {IWallet} from './interfaces';

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

export const loadWalletsEpic = (action$: ActionsObservable<ReturnType<typeof loadWallets>>) => action$.pipe(
    ofType(LOAD_WALLETS),
    switchMap((action) => {
        // TODO Mock API
        return timer(100).pipe(
            mapTo(action.onSuccess(MOCK_WALLETS))
        );
    })
);
