export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://gpuismine.p-e.kr/api" // main server
    : "https://gpuismine.kro.kr/api"; // dev server

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
