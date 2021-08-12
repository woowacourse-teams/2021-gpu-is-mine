import { useEffect } from "react";
import { useParseParams, useGetGpuServerById } from "../../hooks";

// eslint-disable-next-line import/prefer-default-export
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
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    makeRequest();

    return done;
  }, [makeRequest, done]);

  return { detail: data, makeRequest, done, ...rest };
};
