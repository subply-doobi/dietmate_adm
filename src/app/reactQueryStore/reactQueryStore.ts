import { QueryCache, QueryClient } from "@tanstack/react-query";
import { handleError } from "../../shared/util/handleError";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // suspense: true,
      // staleTime: 30000,
      // gcTime: 5 * 60 * 1000,
      retry: 0,
      staleTime: Infinity,
      gcTime: Infinity,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
      onError: (error) => {
        console.log("mutation onError: ", error);
        handleError(error);
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.log("queryCache onError: ", error);
      handleError(error);
    },
  }),
});
