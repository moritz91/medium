import { createContext } from "react";

export interface FlyoutContextProps {
  dispatch: React.Dispatch<{}>;
  state: any;
}

export const FlyoutContext = createContext<FlyoutContextProps>({
  dispatch: () => {},
  state: "",
});
