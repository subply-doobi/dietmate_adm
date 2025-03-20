import axios, { AxiosRequestConfig, AxiosResponse, isAxiosError } from "axios";
import { GET_AUTH, GET_TOKEN, KLTokenUrl, RE_ISSUE_TOKEN } from "../urls";
import { IDoobiToken } from "../types/token";
import { IKLToken } from "../types/login";
import { KLRedirectUrl, KLRestAPIKey } from "../../consts";

export const requestFn = async <T, R>(
  config: AxiosRequestConfig
): Promise<R> => {
  try {
    const response: AxiosResponse<R> = await axios.request<R>(config);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      // Log the error details for debugging
      console.error("requestFn error:", error);
      if (error.response) {
        console.error("requestFn error.response:", error.response);
      } else if (error.request) {
        console.error("requestFn error.request:", error.request);
      }
      throw error;
    } else {
      console.error("requestFn Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

export const getKakaoAccessToken = async (code: string) => {
  try {
    const { access_token: kakaoAccessToken, refresh_token } = await requestFn<
      any,
      IKLToken
    >({
      url: KLTokenUrl,
      method: "post",
      data: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: KLRestAPIKey,
        redirect_uri: KLRedirectUrl,
        code: code || "",
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log("getKakaoToken: kakaoAccessToken: ", kakaoAccessToken);
    return kakaoAccessToken;
  } catch (e) {
    return null;
  }
};

export const storeDoobiToken = async (kakaoAccessToken: string | null) => {
  if (!kakaoAccessToken) return false;
  try {
    const { accessToken, refreshToken } = await requestFn<any, IDoobiToken>({
      url: `${GET_TOKEN}/${kakaoAccessToken}`,
    });
    console.log("storeDoobiToken: token stored!");

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    }
    return true;
  } catch (e) {
    return false;
  }
};

export const getAuth = async () => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const res = await requestFn<any, any>({
      url: GET_AUTH,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log("getAuth: res: ", res);
    return true;
  } catch (e) {
    return false;
  }
};

export const reissueDoobiToken = async () => {
  const orgRefreshToken = localStorage.getItem("refreshToken");
  try {
    const { accessToken, refreshToken } = await requestFn<any, IDoobiToken>({
      method: "get",
      url: RE_ISSUE_TOKEN,
      headers: {
        Authorization: `Bearer ${orgRefreshToken}`,
      },
    });
    // console.log("reissueDoobiToken: accessToken: ", accessToken);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    return true;
  } catch (e) {
    return false;
  }
};

export const validateToken = async () => {
  // getAuth 로 token validation start
  console.log("validateToken: GET_AUTH start");
  const getAuthSuccess = await getAuth();
  console.log("validateToken: GET_AUTH_Success: ", getAuthSuccess);
  if (getAuthSuccess) return true;

  // token inValid -> reissue token
  console.log("validateToken: attempting to reissue token");
  const reIssueSuccess = await reissueDoobiToken();
  return reIssueSuccess;
};
