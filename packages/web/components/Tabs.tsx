import React, { useContext } from "react";
import { TabList, Tabs, Tab, TabPanel } from "./tabs/Tabs";
import { PostRow, Comment } from "@medium/ui";
import { PostsContext } from "../modules/post/shared/PostsContext";
import { Link } from "../server/routes";
import { Box } from "rebass";
import { DeleteComment } from "../modules/post/shared/DeleteComment";

export function ProfileTabs() {
  const { postings, comments } = useContext(PostsContext);

  return (
    <>
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
          {comments.map(c => (
            <Box key={c.id}>
              <Comment
                createdAt={c.createdAt}
                creator={c.creator}
                body={c.text}
                Link={Link}
              />
              <Box mx={3} mt={1}>
                <DeleteComment commentId={c.id} />
              </Box>
            </Box>
          ))}
        </TabPanel>
      </Tabs>
    </>
  );
}
