import { useEffect, useRef } from "react";

import "react-activity/dist/Squares.css";

import { useGetKLToken } from "../../shared/api/query/login";
import { storeDoobiToken } from "../../shared/api/query/token";
import LoadingContent from "../../components/loading/LoadingContent";

export default function KakaoLogin() {
  const getKLTokenMutation = useGetKLToken();
  const hasRunOnce = useRef(false);

  useEffect(() => {
    if (hasRunOnce.current) return;
    hasRunOnce.current = true;

    const loginWithKakao = async () => {
      const code = new URL(window.location.href).searchParams.get("code");
      if (!code) return;
      const kakaoTokenRes = await getKLTokenMutation.mutateAsync({
        authCode: code,
      });
      console.log(
        "KakaoLogin: kakaoTokenRes: ",
        kakaoTokenRes.access_token,
        kakaoTokenRes.refresh_token
      );
      await storeDoobiToken(kakaoTokenRes.access_token);

      // 1 second delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      window.location.href = "/order";
    };

    loginWithKakao();
  }, []);

  return <LoadingContent msg="kakao login processing" />;
}
