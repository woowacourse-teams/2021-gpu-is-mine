import { useParseParams } from "../../hooks";

// eslint-disable-next-line import/prefer-default-export
export const useServerId = () => {
  const serverId = useParseParams("serverId");

  if (Number.isNaN(Number(serverId))) {
    throw Error(`Invalid serverId in params: ${serverId}`);
  }

  return Number(serverId);
};
