import { createContext } from "react";
import { FlyoutContextProps } from "./FlyoutContext";

// Coincidentally shares the same context props as the FlyoutContext
export const TagContext = createContext<FlyoutContextProps>({
  dispatch: () => {},
  state: ""
});
