import { useEffect } from "react";
import { store } from "../../app/store";
import { Outlet } from "react-router-dom";
import { authApiSlice } from "./authApiSlice";

const PrefetchCntyCode = () => {
  useEffect(() => {
    const countryCode = store.dispatch(
      authApiSlice.endpoints.getCountryCode.initiate()
    );

    return () => {
      countryCode.unsubscribe();
    };
  }, []);

  return <Outlet />;
};

export default PrefetchCntyCode;
