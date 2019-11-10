import {of} from 'rxjs';
import {hot} from 'jest-marbles';
import {StoreRegistry} from './StoreRegistry';

describe('StoreRegistry', () => {
    afterEach(() => {
        StoreRegistry.reducers = {};
        StoreRegistry.changeListener = null;
    });

    describe('rootEpic', () => {
        it('should return epic subject', () => {
            const action$ = hot('-a', {
                a: { type: 'FETCH_USER', id: '123' }
            }) as any;
            const state$ = null;

            const subscribeSpy = jest.fn();
            StoreRegistry.rootEpic(action$, state$ as any, null).subscribe(subscribeSpy);

            expect(subscribeSpy).not.toHaveBeenCalled();

            StoreRegistry.registerEpic(() => of(123));

            expect(subscribeSpy).toHaveBeenCalledWith(123);
        });
    });

    describe('registerEpic', () => {
        it('should register reducer and call onChange listener', () => {
            const mockReducer1 = () => {};
            const mockReducer2 = () => {};
            const spyOnChange = jest.fn();
            StoreRegistry.onChange(spyOnChange);

            StoreRegistry.registerReducer({
                mock1: mockReducer1
            });

            expect(spyOnChange).lastCalledWith({
                mock1: mockReducer1
            });
            spyOnChange.mockClear();

            StoreRegistry.registerReducer({
                mock2: mockReducer2
            });

            expect(spyOnChange).lastCalledWith({
                mock1: mockReducer1,
                mock2: mockReducer2
            });
        });
    });

    describe('getReducers', () => {
        it('should return all registered reducers', () => {
            const mockReducer1 = () => {};
            const mockReducer2 = () => {};
            StoreRegistry.registerReducer({
                mock1: mockReducer1
            });
            StoreRegistry.registerReducer({
                mock2: mockReducer2
            });

            expect(StoreRegistry.getReducers()).toEqual({
                mock1: mockReducer1,
                mock2: mockReducer2
            });
        });
    });

    describe('onChange', () => {
        it('should throw error if more than one subscription attempt detected', () => {
            const spyOnChange = jest.fn();
            StoreRegistry.onChange(spyOnChange);
            expect(() => StoreRegistry.onChange(spyOnChange)).toThrow(
                new Error('Can only set the listener for a StoreRegistry once.')
            );
        });
    });
});
