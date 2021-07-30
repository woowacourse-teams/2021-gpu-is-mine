import useFetch from "../useFetch/useFetch";
import { API_ENDPOINT } from "../../constants";
import { JobViewResponse } from "../../types";

// eslint-disable-next-line import/prefer-default-export
export const useGetJobDetail = ({ labId, jobId }: { labId: number; jobId: number }) =>
  useFetch<JobViewResponse>(`${API_ENDPOINT.LABS(labId).JOBS}/${jobId}`, {
    method: "post",
  });
