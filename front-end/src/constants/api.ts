const BASE_URL = "http://3.35.169.99:8080/api"; // local
// const BASE_URL = "https://3.35.169.99/api";// remote

const API_ENDPOINT = {
  LABS(labId: number) {
    return {
      GPUS: `${BASE_URL}/labs/${labId}/gpus`,
    };
  },
};

export default API_ENDPOINT;
