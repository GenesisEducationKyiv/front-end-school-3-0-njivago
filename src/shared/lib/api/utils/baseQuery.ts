import * as Belt from "@mobily/ts-belt";
import type { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { getErrorMessage } from "shared/lib/utils";
import type { TFetchMethod } from "../types";
import { populateParams } from "./populateParams";
import { populateSearchParams } from "./populateSearchParams";

const isResponseData = (responseData: unknown) =>
  responseData &&
  typeof responseData === "object" &&
  !Array.isArray(responseData) &&
  ("data" in responseData || "meta" in responseData);

export const baseQuery =
  (
    { baseUrl }: { baseUrl?: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method?: TFetchMethod;
      params?: object;
      search?: object;
      body?: object | FormData;
      formData?: boolean;
      headers?: Record<string, string>;
    },
    unknown,
    unknown
  > =>
  async (options) => {
    const {
      url = "",
      method = "GET",
      search = undefined,
      params = undefined,
      body = undefined,
      headers: customHeaders = {},
    } = options;

    const preparedEndpoint = (endpoint: string) => {
      let result = endpoint;
      if (params) {
        result = populateParams(params)(result);
      }
      if (search) {
        result = populateSearchParams(search)(result);
      }
      return result;
    };

    const preparedUrl = `${baseUrl}${preparedEndpoint(url)}`;

    // Don't stringify FormData bodies
    const preparedBody =
      body instanceof FormData ? body : body ? JSON.stringify(body) : undefined;

    const headers: Record<string, string> = {
      ...(!(body instanceof FormData) && {
        "Content-Type": "application/json",
      }),
      ...customHeaders,
    };

    const fetchResult = await Belt.R.fromPromise(
      fetch(preparedUrl, {
        method,
        headers,
        body: preparedBody,
      })
    );

    if (Belt.R.isError(fetchResult)) {
      const error = Belt.R.getExn(Belt.R.flip(fetchResult));

      return {
        error: getErrorMessage(error),
      };
    }

    const response = Belt.R.getExn(fetchResult);

    if (!response.ok) {
      const errorDataResult = await Belt.R.fromPromise(
        response.json().catch(() => ({ error: response.statusText }))
      );

      const errorData = Belt.R.getWithDefault(errorDataResult, {
        error: response.statusText,
      });

      return {
        error: {
          status: response.status,
          data: errorData,
        },
      };
    }

    const jsonResult = await Belt.R.fromPromise(response.json());

    const responseData = Belt.R.getWithDefault(jsonResult, null);

    if (isResponseData(responseData)) {
      return { data: responseData };
    }

    return {
      data: responseData,
    };
  };
