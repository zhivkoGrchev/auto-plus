declare type PartialFields<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> & Partial<Pick<T, K>>
declare type NonNullableFields<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> & { [I in K]: NonNullable<T[I]> }
