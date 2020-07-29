
export type Nullable<T> = T | null
export type Brand<K, T> = K & { __brand: T }
