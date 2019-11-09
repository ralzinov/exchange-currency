import {Action} from 'redux';

export interface IActionWithPayload<TPayload = unknown> extends Action {
    payload?: TPayload;
}

export type IActionCreator<TPayload = never> = (payload?: TPayload) => IActionWithPayload<TPayload>;

export type ISideEffectActionCreator<TPayload = never, S = any, E = any> = (payload?: TPayload) => IActionWithPayload<TPayload> & {
    onSuccess: IActionCreator<S>;
    onError: IActionCreator<E>;
};
