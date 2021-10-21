import { useEffect } from "react";
import { STORAGE_KEY } from "../../constants";
import { storage } from "../../services";
import { authorize } from "../../features/member/authSlice";
import { useAppDispatch } from "../../app/hooks";

const useAuthorize = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = storage.get(STORAGE_KEY.ACCESS_TOKEN);
    const expires = storage.get(STORAGE_KEY.EXPIRES, (_, value: string) => new Date(value));

    if (accessToken && expires) {
      dispatch(authorize({ accessToken, expires }))
        .unwrap()
        .catch(() => {
          storage.remove(STORAGE_KEY.ACCESS_TOKEN);
          storage.remove(STORAGE_KEY.EXPIRES);
        });
    }
  }, [dispatch]);
};

export default useAuthorize;
