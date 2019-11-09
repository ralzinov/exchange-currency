import {Action} from 'redux';

interface IAppReducerState {}
const intitalState: IAppReducerState = {};

/**
 * App wide reducer
 * @param state
 * @param action
 */
export function appReducer(state: IAppReducerState = intitalState, action: Action) {
    return state;
}
