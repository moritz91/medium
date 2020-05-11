import { FlyoutContextProps } from "context/flyout-context";
import { createContext } from "react";

// Coincidentally shares the same context props as the FlyoutContext
export const TagContext = createContext<FlyoutContextProps>({
  dispatch: () => {},
  state: "",
});
