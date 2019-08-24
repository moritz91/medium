import React from "react";
import { AuthProvider } from "./AuthContext";

const AppProviders = ({ children }: any) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AppProviders;
