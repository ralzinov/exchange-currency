import lodashMemoize from 'lodash/memoize';

export const isDevelopment = () => {
    return process.env.NODE_ENV !== 'production';
};

export const memoize = (func: (...args: any[]) => any) => {
    return lodashMemoize(func);
};
