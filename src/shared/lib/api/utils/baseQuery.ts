import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { TFetchMethod } from "../types";
import { populateParams } from "./populateParams";
import { populateSearchParams } from "./populateSearchParams";

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
    try {
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
        body instanceof FormData
          ? body
          : body
          ? JSON.stringify(body)
          : undefined;

      const headers: Record<string, string> = {
        ...(!(body instanceof FormData) && {
          "Content-Type": "application/json",
        }),
        ...customHeaders,
      };

      const response = await fetch(preparedUrl, {
        method,
        headers,
        body: preparedBody,
      }).catch((error) => {
        throw new Error(error.message);
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { error: response.statusText };
        }

        return {
          error: {
            status: response.status,
            data: errorData,
          },
        };
      }

      const responseData = await response.json().catch((error) => {
        console.error("JSON parse error:", error);
        return null;
      });

      if (
        responseData &&
        typeof responseData === "object" &&
        !Array.isArray(responseData)
      ) {
        if ("data" in responseData || "meta" in responseData) {
          return { data: responseData };
        }
      }

      return {
        data: responseData,
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : String(error),
      };
    }
  };
