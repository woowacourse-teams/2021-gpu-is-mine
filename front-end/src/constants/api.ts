export const { BASE_URL } = process.env;

if (BASE_URL == null) {
  throw new Error(`BASE_URL을 실행 시 환경변수로 주입해주세요.`);
}

const API_ENDPOINT = {
  LABS(labId: number) {
    return {
      GPUS: `${BASE_URL}/labs/${labId}/gpus`,
      JOBS: `${BASE_URL}/labs/${labId}/jobs`,
    };
  },
  MEMBER: {
    SIGNUP: `${BASE_URL}/members`,
    ME: `${BASE_URL}/members/me`,
    LOGIN: `${BASE_URL}/login`,
  },
};

export default API_ENDPOINT;
