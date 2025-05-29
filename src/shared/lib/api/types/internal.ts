import type { BaseSchema, InferInput } from "valibot";
import type {
  IsAllOptional,
  IsUnion,
  IsVoidOrNullish,
  MakePartial,
} from "./typescript";

export type TParamsDefault = Record<string, number | string>;
export type TSearchParamsDefault = Record<
  string,
  Array<number | string> | number | string
>;
export type TBodyDefault = Record<string, unknown> | Array<unknown>;

export type ExtractParams<T extends string> =
  T extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? Param | ExtractParams<`/${Rest}`>
    : T extends `${infer _Start}:${infer Param}`
    ? Param
    : never;

// oxlint-disable-next-line @typescript-eslint/no-explicit-any
export type TApiSchema<T extends BaseSchema<any, any, any>> = InferInput<T>;

export type TMakeApiOption<
  TOptionName extends string,
  TOptionObject
> = IsVoidOrNullish<TOptionObject> extends true
  ? undefined
  : IsUnion<TOptionName> extends true
  ? undefined
  : MakePartial<
      {
        [Key in TOptionName]: TOptionObject;
      },
      IsAllOptional<TOptionObject>
    >;
