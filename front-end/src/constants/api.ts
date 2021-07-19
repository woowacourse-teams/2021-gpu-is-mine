const BASE_URL = "https://gpuismine.kro.kr/api";

const API_ENDPOINT = {
  LABS(labId: number) {
    return {
      GPUS: `${BASE_URL}/labs/${labId}/gpus`,
    };
  },
};

export default API_ENDPOINT;
