const CACHE_KEY = {
  JOB: Symbol("cache-key-job"),
  JOB_DETAIL: Symbol("cache-key-job-detail"),
  GPU_SERVER: Symbol("cache-key-gpu-server"),
} as const;

export default CACHE_KEY;
