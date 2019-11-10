/// <reference types="react-scripts" />

declare type Dict<T> = {[p:string]: T};

declare type PartialDeep<T> = {
    [P in keyof T]?: T[P] extends NonObjectType
        ? NonObjectType
        : PartialDeep<T[P]>;
};
