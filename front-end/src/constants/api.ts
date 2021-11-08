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
