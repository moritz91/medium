import { createContext } from "react";

interface UserContextProps {
  user: Object;
  setUser: (user: any) => void;
}

export const UserContext = createContext<UserContextProps>({
  user: {},
  setUser: (user: any) => user
});
