import { useEffect, useState, useRef } from "react";
import Popper from "popper.js";

const defaultOpts = {
  placement: "bottom",
  offset: "0, 0",
  flip: true,
  overflow: true
};

export const usePopper = (options: any) => {
  const ref = useRef(null);
  const popper = useRef(null);
  const [styles, setStyles] = useState({});
  const opts = { ...defaultOpts, ...options };

  const modifier = (data: any) => {
    setStyles(data.offsets.popper);
    return data;
  };

  useEffect(() => {
    if (!ref.current || !popper.current) return;
    const instance = new Popper(ref.current!, popper.current!, {
      placement: opts.placement,
      removeOnDestroy: true,
      modifiers: {
        flip: {
          enabled: opts.flip,
          padding: 16
        },
        preventOverflow: {
          enabled: opts.overflow
        },
        hide: {
          enabled: false
        },
        applyStyle: {
          enabled: false
        },
        offset: {
          offset: opts.offset
        },
        setState: {
          order: 900,
          enabled: true,
          fn: modifier
        }
      }
    });

    return () => instance.destroy();
  }, []);

  return [ref, popper, styles];
};
