import { AuthProvider } from "context/auth-context";
import React from "react";

const AppProviders = ({ children }: any) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AppProviders;
