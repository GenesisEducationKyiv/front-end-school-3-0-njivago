import { useEffect, useState } from "react";
import {
  getSearchParams,
  setSearchParams,
  removeSearchParams as deleteSearchParams,
} from "../utils/url";
import type { PartialRecord } from "../types";

type UseSearchParamsOptions<T extends PartialRecord<string, unknown>> = {
  keys: Array<keyof T & string>;
  defaultValues?: Partial<T>;
};

export const useSearchParamsState = <T extends PartialRecord<string, unknown>>({
  keys,
  defaultValues = {},
}: UseSearchParamsOptions<T>) => {
  const [searchParams, setSearchParamsState] = useState<Partial<T>>(() => {
    const urlParams = getSearchParams(keys);
    return {
      ...defaultValues,
      ...urlParams,
    };
  });

  useEffect(() => {
    const params: Record<string, string> = {};
    const paramsToRemove: string[] = [];

    keys.forEach((key) => {
      const value = searchParams[key];
      if (value !== undefined) {
        params[key] = String(value);
      } else {
        paramsToRemove.push(key);
      }
    });

    setSearchParams(params);
    if (paramsToRemove.length > 0) {
      deleteSearchParams(paramsToRemove);
    }
  }, [searchParams, keys]);

  const updateSearchParams = (updates: Partial<T>) => {
    setSearchParamsState((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const removeSearchParams = (keysToRemove: Array<keyof T & string>) => {
    setSearchParamsState((prev) => {
      const newState = { ...prev };
      keysToRemove.forEach((key) => {
        delete newState[key];
      });
      return newState;
    });
  };

  const clearSearchParams = () => {
    setSearchParamsState(defaultValues);
  };

  return {
    searchParams,
    updateSearchParams,
    removeSearchParams,
    clearSearchParams,
  };
};
