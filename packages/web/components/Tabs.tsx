import React, { useContext } from "react";
import { TabList, Tabs, Tab, TabPanel } from "./tabs/Tabs";
import { PostRow } from "@medium/ui";
import { PostsContext } from "../modules/post/shared/PostsContext";
import { Link } from "../server/routes";
import { useApolloClient } from "react-apollo-hooks";
import { findUserCommentsQuery } from "../graphql/user/query/userComments";

async function findUserCommentsQueryFunc(username: string) {
  const response = await useApolloClient().query({
    query: findUserCommentsQuery,
    variables: {
      username
    }
  });

  return response;
}

export function ProfileTabs() {
  const { username, postings } = useContext(PostsContext);

  findUserCommentsQueryFunc(username);

  return (
    <Tabs initialValue="posts">
      <TabList>
        <Tab name="posts">Posts</Tab>
        <Tab name="responses">Responses</Tab>
      </TabList>
      <TabPanel name="posts">
        {postings.map(p => (
          <PostRow
            key={p.id}
            id={p.id}
            createdAt={p.createdAt}
            creator={p.creator}
            title={p.title}
            body={p.body}
            numComments={p.numComments}
            Link={Link}
            getLinkProps={() => ({
              route: "post",
              params: {
                id: p.id
              }
            })}
          />
        ))}
      </TabPanel>
      <TabPanel name="responses" />
    </Tabs>
  );
}
