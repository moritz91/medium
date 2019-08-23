import React from "react";
import { useAuth } from "./AuthContext";

const UserContext = React.createContext({
  data: { me: "" }
});

const UserProvider = (props: any) => {
  const { data } = useAuth();
  return <UserContext.Provider value={data} {...props} />;
};

const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
};

export { UserProvider, useUser };
