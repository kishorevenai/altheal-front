import { useEffect, useState } from "react";

export const usePersist = () => {
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );
  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return [persist, setPersist];
};
