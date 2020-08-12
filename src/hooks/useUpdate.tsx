import { useEffect, useRef } from "react";

export const useUpdate = (fn: () => void, dependency: any) => {
  const count = useRef(0);
  useEffect(() => {
    count.current += 1;
  });
  useEffect(() => {
    if (count.current > 1) {
      let x = fn();
      return x;
    }
  }, [fn, dependency]); // 不可变数据
};
