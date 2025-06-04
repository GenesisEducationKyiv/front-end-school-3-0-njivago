import type { BaseSchema } from "valibot";
import type {
  TMakeApiOption,
  TParamsDefault,
  TSearchParamsDefault,
  TBodyDefault,
  TApiSchema,
} from "./internal";
import type { And, Extends, UnionIfNotNullish } from "./typescript";

export type TFetchMethod = "GET" | "POST" | "PUT" | "DELETE";

type QueryParams<TParams> = TMakeApiOption<"params", TParams>;
type QuerySearch<TSearch> = TMakeApiOption<"search", TSearch>;
type QueryBody<TBody> = TMakeApiOption<"body", TBody>;

export type QueryOptions<
  TParams extends TParamsDefault | void = void,
  TSearch extends TSearchParamsDefault | void = void,
  TBody extends TBodyDefault | void = void
> = And<
  [Extends<void, TParams>, Extends<void, TSearch>, Extends<void, TBody>]
> extends true
  ? void
  : UnionIfNotNullish<
      [QueryParams<TParams>, QuerySearch<TSearch>, QueryBody<TBody>]
    >;

export type TApiSuccessResponse<TDataType> = {
  data: TDataType;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PreparedResponse<T extends BaseSchema<any, any, any>> =
  TApiSuccessResponse<TApiSchema<T>>;
