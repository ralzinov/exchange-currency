import {Reducer} from 'redux';
import {Subject} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {Epic} from 'redux-observable';

/**
 * Store registry singleton
 */
export class StoreRegistry {
    static reducers: Dict<Reducer> = {};
    static changeListener: null|((reducers: Dict<Reducer>) => void) = null;
    private static epicSubj$ = new Subject<Function>();

    static rootEpic: Epic = (action$, state$) => {
        return StoreRegistry.epicSubj$.pipe(
            mergeMap((epic) => epic(action$, state$))
        )
    };

    static registerEpic(epic: Function): void {
        this.epicSubj$.next(epic);
    }

    static registerReducer(newReducers: Dict<Reducer>): void {
        this.reducers = {
            ...this.reducers,
            ...newReducers
        };

        if (this.changeListener != null) {
            this.changeListener(this.getReducers())
        }
    }

    static getReducers(): Dict<Reducer> {
        return {...this.reducers};
    }

    static onChange(listener: (reducers: Dict<Reducer>) => void): void {
        if (this.changeListener != null) {
            throw new Error('Can only set the listener for a StoreRegistry once.')
        }
        this.changeListener = listener;
    }
}

