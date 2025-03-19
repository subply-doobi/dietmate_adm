// 에러 -> 에러코드
// null -> 네트워크 없음

import { isAxiosError } from "axios";

// 네트워크 연결 있는데 Network Error인 경우 -> 999 (지금은 서버 주소 바뀌었을 때 발생)
const convertErrorToCode = async (error: unknown) => {
  if (!error) return undefined;
  if (!isAxiosError(error)) return 520;
  if (error.response) return error.response.status;
  return 520;
};

// 에러 코드별 메시지
type IErrorCode = number;
type ICodeToMsg = {
  [key: number]: string;
};
export const msgByCode: ICodeToMsg = {
  401: `다시 로그인을 해주세요\n(errorCode: 401)`,
  500: `서버 오류가 발생했어요\n앱을 재시작합니다\n(errorCode: 500)`,
};
const getMsgByCode = (code: IErrorCode | undefined | null) => {
  if (code === undefined) return "";
  if (code === null) return `네트워크가 불안정해요\n연결을 확인해주세요`;
  return (
    msgByCode[code] ||
    `알수없는 오류가 발생했어요\n다시 시도해주세요\n(errorCode: ${code})`
  );
};

// 에러 코드별 실행 로직
type ICodeToErrorAction = {
  [key: number]: Function | null;
};
const errorActionByCode: ICodeToErrorAction = {
  // TBD
  401: () => {
    if (window.confirm(getMsgByCode(401))) {
      console.log("Login창으로 이동");
      window.location.href = "/";
    }
  },
};

// 에러코드 -> 액션
const runErrorActionByCode = (code: IErrorCode | undefined | null) => {
  console.log("runErrorACtionByCode");
  // undefined -> nothing
  if (code === null || code === undefined) return;

  // 정의된 것 있는 경우
  if (errorActionByCode[code]) {
    const action = errorActionByCode[code];
    action && action();
    return;
  }

  // 정의된 것 없는 경우
  console.error(`No action for errorCode: ${code}`);
  window.confirm(getMsgByCode(code));
  window.location.href = "/";
  return;
};

// 에러 핸들러
export const handleError = async (error: Error) => {
  const errorCode = await convertErrorToCode(error);
  runErrorActionByCode(errorCode);
};
