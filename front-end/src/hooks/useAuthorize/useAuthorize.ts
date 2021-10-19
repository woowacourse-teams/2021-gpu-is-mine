import { SerializedError } from "@reduxjs/toolkit";
import { useEffect, useRef } from "react";
import { STORAGE_KEY } from "../../constants";
import { storage } from "../../services";
import { authorize } from "../../features/member/authSlice";
import { useAppDispatch } from "../../app/hooks";

const useAuthorize = () => {
  const dispatch = useAppDispatch();

  const accessToken = storage.get(STORAGE_KEY.ACCESS_TOKEN);
  const expiresRef = useRef(
    storage.get(STORAGE_KEY.EXPIRES, (_, value: string) => new Date(value))
  );

  useEffect(() => {
    if (accessToken && expiresRef.current) {
      dispatch(authorize({ accessToken, expires: expiresRef.current }))
        .unwrap()
        .catch((error: SerializedError) => {
          if (error.name === "AuthorizationError") {
            storage.remove(STORAGE_KEY.ACCESS_TOKEN);
            storage.remove(STORAGE_KEY.EXPIRES);
          }

          // eslint-disable-next-line @typescript-eslint/no-throw-literal
          throw error;
        });
    }
  }, [dispatch, accessToken]);
};

export default useAuthorize;
