import { useContext } from "react";
import { UserContext } from "../components/context/UserContext";
import { NextContextWithApollo } from "../types/NextContextWithApollo";
import { meQuery } from "../graphql/user/query/me";

export const IsAuthenticated = async ({
  apolloClient
}: NextContextWithApollo) => {
  const user = await apolloClient.query({ query: meQuery });
  const { setUser } = useContext(UserContext);
  return setUser(user);
};
