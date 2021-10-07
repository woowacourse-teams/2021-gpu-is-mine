export const BASE_URL = process.env.BASE_URL as string;

if (BASE_URL == null) {
  throw new Error(`BASE_URL을 실행 시 환경변수로 주입해주세요.`);
}

const API_ENDPOINT = {
  LABS(labId: number) {
    return {
      GPUS: `/labs/${labId}/gpus`,
      JOBS: `/labs/${labId}/jobs`,
    };
  },
  MEMBER: {
    SIGNUP: `/members`,
    ME: `/members/me`,
    LOGIN: `/login`,
  },
};

export default API_ENDPOINT;
