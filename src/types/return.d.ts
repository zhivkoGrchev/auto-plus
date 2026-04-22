declare type Return<T> = { data: T; error: undefined } | { data: undefined; error: Record<string, string | string[]> }
