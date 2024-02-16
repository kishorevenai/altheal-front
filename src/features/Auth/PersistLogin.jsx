import { useEffect, useRef, useState } from "react";
import { selectCurrentToken } from "./authSlice";
import { useSelector } from "react-redux";
import { combineSlices } from "@reduxjs/toolkit";
import { usePersist } from "../../hooks/usePersist";
import { useRefreshMutation } from "./authApiSlice";

export const PersistLogin = () => {
  const [trueSuccess, setTrueSuccess] = useState(false);
  const [persist, setPersist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const [refresh, { isLoading, isSuccess, isUninitialized, isError }] =
    useRefreshMutation();
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const verifyRefreshToken = async () => {
        try {
          await refresh();

          setTrueSuccess(true);
        } catch (error) {
          console.error(error);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }
    return () => {
      effectRan.current = true;
    };
  }, []);
  return <div></div>;
};
