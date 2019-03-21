import React, { useContext } from "react";
import { TabList, Tabs, Tab, TabPanel } from "./tabs/Tabs";
import { PostRow } from "@medium/ui";
import { Box } from "rebass";
import { PostsContext } from "../modules/post/shared/PostsContext";
import { Link } from "../server/routes";

export function ProfileTabs() {
  const { postings } = useContext(PostsContext);

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
      <TabPanel name="responses">
        <Box fontSize={4}>
          Vue.js is an open-source JavaScript framework for building user
          interfaces and single-page applications.
        </Box>
      </TabPanel>
    </Tabs>
  );
}
