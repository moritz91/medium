import { createContext } from "react";

export interface PopoverContextProps {
  popoverState: boolean;
  bind: Object;
}

export const PopoverContext = createContext<PopoverContextProps>({
  popoverState: false,
  bind: {}
});
