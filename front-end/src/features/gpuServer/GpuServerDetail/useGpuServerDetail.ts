import { useEffect } from "react";
import { useParseParams, useGetGpuServerById } from "../../../hooks";

export const useServerId = () => {
  const serverId = useParseParams("serverId");

  if (Number.isNaN(Number(serverId))) {
    throw Error(`Invalid serverId in params: ${serverId}`);
  }

  return Number(serverId);
};

export const useGpuServerDetail = ({ labId, serverId }: { labId: number; serverId: number }) => {
  const { data, makeRequest, done, ...rest } = useGetGpuServerById({ labId, serverId });

  useEffect(() => {
    makeRequest();

    return done;
  }, [makeRequest, done]);

  return { detail: data, makeRequest, done, ...rest };
};
