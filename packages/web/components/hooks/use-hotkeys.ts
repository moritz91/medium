import hotkeys from "hotkeys-js";
import { useEffect } from "react";

export const useHotkeys = (key: any, cb: any, inputs: any) => {
  useEffect(() => {
    hotkeys(key, cb);
    return () => hotkeys.unbind(key);
  }, inputs);
};
