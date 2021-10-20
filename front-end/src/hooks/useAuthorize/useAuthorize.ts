import { useEffect } from "react";
import { STORAGE_KEY } from "../../constants";
import { storage } from "../../services";
import { authorize } from "../../features/member/authSlice";
import { useAppDispatch } from "../../app/hooks";

const useAuthorize = () => {
  const dispatch = useAppDispatch();

  const accessToken = storage.get(STORAGE_KEY.ACCESS_TOKEN);

  useEffect(() => {
    const expires = storage.get(STORAGE_KEY.EXPIRES, (_, value: string) => new Date(value));

    if (accessToken && expires) {
      dispatch(authorize({ accessToken, expires }));
    }
  }, [dispatch, accessToken]);
};

export default useAuthorize;
