// eslint-disable-next-line @typescript-eslint/naming-convention
export const __IS_PRODUCTION__ = process.env.NODE_ENV === "production";

export const BASE_URL = (() => {
  const baseUrl = process.env.BASE_URL;

  if (baseUrl == null) {
    throw new Error(`BASE_URL을 실행 시 환경변수로 주입해주세요.`);
  }

  return baseUrl;
})();
