import axios, { AxiosError, AxiosResponse } from "axios";
import { GET_AUTH, GET_TOKEN, RE_ISSUE_TOKEN } from "../urls";
import { IDoobiToken } from "../types/token";
import { requestFn } from "../requestFn";

export const storeDoobiToken = async (kakaoAccessToken: string) => {
  try {
    const { accessToken, refreshToken } = await requestFn<any, IDoobiToken>({
      url: `${GET_TOKEN}/${kakaoAccessToken}`,
      needAuth: false,
    });
    console.log("storeDoobiToken: ", accessToken, refreshToken);

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    }
    return accessToken;
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

export const reissueDoobiToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const res = await requestFn<any, IDoobiToken>({
    url: RE_ISSUE_TOKEN,
    needAuth: false,
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  localStorage.setItem("accessToken", res.accessToken);
};

export const validateToken = async () => {
  console.log("validateToken: start");
  let isValid = false;
  try {
    // 인증 여부 조회
    console.log("request GET_AUTH");
    await requestFn({ url: GET_AUTH });
    isValid = true;

    // 인증 오류 처리
  } catch (e) {
    console.log("error in GET_AUTH");
    if (!(e instanceof AxiosError)) return isValid;

    console.log("GET_AUTH status:", e.response?.status);
    // 토큰 재발급 (401에러인 경우만 재발급 시도)
    if (e.response?.status !== 401) return isValid;
    try {
      console.log("request reIssue");
      reissueDoobiToken();
      isValid = true;
      console.log(
        "----------------------  !! reIssue !! --------------------------"
      );

      // 토큰 재발급 오류
    } catch (e) {
      if (!(e instanceof AxiosError)) return isValid;
      console.log("error in reIssue: ", e.response?.status);
      console.log("login needed");
    }
  }
  console.log("validateToken: isValid: ", isValid);
  return isValid;
};
