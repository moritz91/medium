import { useApolloClient, useQuery } from "@apollo/react-hooks";
import { logoutMutation } from "graphql/user/mutations/logout";
import { meQuery } from "graphql/user/query/me";
import redirect from "lib/redirect";
import React from "react";

const AuthContext = React.createContext({
  data: { me: { username: "", pictureUrl: "", createdAt: "", bio: "" } },
  logout: (ctx: any) => ctx,
});

const AuthProvider = (props: any) => {
  const apolloClient = useApolloClient();
  const [firstAttemptFinished, setFirstAttemptFinished] = React.useState(false);
  const { data, error, loading } = useQuery(meQuery, {
    variables: { withBookmarks: false },
  });

  React.useEffect(() => {
    if (!loading) {
      setFirstAttemptFinished(true);
    }
  }, [loading]);

  if (!firstAttemptFinished) {
    if (loading) {
      return null;
    }
    if (error) {
      return (
        <div style={{ color: "red" }}>
          <p>Uh oh... There's a problem. Try refreshing the app.</p>
          <pre>{error.message}</pre>
        </div>
      );
    }
  }

  const logout = async (ctx: any) => {
    await apolloClient.mutate({ mutation: logoutMutation });
    await apolloClient.resetStore();
    redirect(ctx, "/");
  };

  return <AuthContext.Provider value={{ data, logout }} {...props} />;
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within an AuthProvider`);
  }
  return context;
};
export { AuthProvider, useAuth };
