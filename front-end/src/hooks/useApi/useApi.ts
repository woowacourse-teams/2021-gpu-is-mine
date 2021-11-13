import useFetch from "../useFetch/useFetch";
import { API_ENDPOINT } from "../../constants";
import type { JobDetailLogResponse, ParsedLogResponse } from "../../types";

export const useGetJobDetailLog = ({ labId, jobId }: { labId: number; jobId: number }) =>
  useFetch<JobDetailLogResponse>(`${API_ENDPOINT.LABS(labId).JOBS}/${jobId}/logs`, {
    method: "get",
  });

export const useGetJobDetailLogForGraph = ({ labId, jobId }: { labId: number; jobId: number }) =>
  useFetch<ParsedLogResponse>(`${API_ENDPOINT.LABS(labId).JOBS}/${jobId}/logs-graph`, {
    method: "get",
  });
