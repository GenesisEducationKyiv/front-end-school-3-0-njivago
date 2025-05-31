export type IsAllOptional<T> = keyof T extends never
  ? true
  : {
      [K in keyof T]-?: object extends Pick<T, K> ? true : false;
    }[keyof T] extends true
  ? true
  : false;

export type And<Conditions extends Array<boolean>> = Conditions extends [
  infer First,
  ...infer Rest
]
  ? First extends false
    ? false
    : Rest extends Array<boolean>
    ? And<Rest>
    : true
  : true;

export type Extends<A, B> = A extends B ? true : false;

export type MakePartial<
  T extends object,
  TIsPartial extends boolean
> = TIsPartial extends true ? Partial<T> : T;

// oxlint-disable-next-line @typescript-eslint/no-explicit-any
export type IsUnion<T, U = T> = T extends any
  ? [U] extends [T]
    ? false
    : true
  : never;

export type IsVoidOrNullish<T> = T extends void | undefined | null
  ? true
  : false;

export type UnionIfNotNullish<Types extends unknown[]> = Types extends [
  infer First,
  ...infer Rest
]
  ? IsVoidOrNullish<First> extends true
    ? UnionIfNotNullish<Rest>
    : First & UnionIfNotNullish<Rest>
  : unknown;
