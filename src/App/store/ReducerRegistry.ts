import {Reducer} from 'redux';

/**
 * Reducer registry singletone
 */
export class ReducerRegistry {
    private static reducers: Dict<Reducer> = {};
    private static changeListener: null|((reducers: Dict<Reducer>) => void) = null;

    static register(newReducers: Dict<Reducer>): void {
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
            throw new Error('Can only set the listener for a ReducerRegistry once.')
        }
        this.changeListener = listener;
    }
}
