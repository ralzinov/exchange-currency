import {Action} from 'redux';

export interface IActionWithPayload<P = unknown> extends Action {
    payload: P;
}

export type IActionCreator<P = unknown> = (payload?: P) => IActionWithPayload;
