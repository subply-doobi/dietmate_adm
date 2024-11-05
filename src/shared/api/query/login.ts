import { useMutation, useQuery } from "@tanstack/react-query";
import { KLRedirectUrl, KLRestAPIKey } from "../../consts";
import { requestFn } from "../requestFn";
import { KLTokenUrl } from "../urls";
import { IKLToken } from "../types/login";

export const useGetKLToken = () => {
  return useMutation({
    mutationFn: ({ authCode }: { authCode: string }) =>
      requestFn<any, IKLToken>({
        needAuth: false,
        url: KLTokenUrl,
        method: "post",
        data: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: KLRestAPIKey,
          redirect_uri: KLRedirectUrl,
          code: authCode,
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }),
    retry: 0,
  });
};
