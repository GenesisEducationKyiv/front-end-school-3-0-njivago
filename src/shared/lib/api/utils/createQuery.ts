import { TFetchMethod } from "../types";
import { ExtractParams } from "../types/internal";

type TEndpointRoute = `/${string}` | `/${string}/`;

type TOptionsCheck<TUrl extends TEndpointRoute> =
  ExtractParams<TUrl> extends never
    ? object
    : {
        params: Record<ExtractParams<TUrl>, unknown>;
      };

export const createQuery =
  <TUrl extends TEndpointRoute>(method: TFetchMethod, url: TUrl) =>
  <TOptions extends TOptionsCheck<TUrl> | void>(
    options: TOptionsCheck<TUrl> extends TOptions ? TOptions : never
  ) => ({
    ...options,
    url,
    method,
  });
