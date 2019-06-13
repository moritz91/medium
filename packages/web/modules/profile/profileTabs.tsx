import React, { useContext } from "react";
import { TabList, Tabs, Tab, TabPanel } from "../../components/tabs/tabs";
import { Comment } from "../../components/comment";
import { PostsContext } from "../post/shared/postContext";
import { Link } from "../../server/routes";
import { Box } from "rebass";
import { MarkdownRenderer } from "../post/shared/markdownEditor/markdownRenderer";
import { ProfilePostItem } from "../../components/profilePostItem";

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
          {postings.map((p: any) => (
            <ProfilePostItem
              key={p.id}
              id={p.id}
              createdAt={p.createdAt}
              creator={p.creator}
              title={p.title}
              body={p.body}
              numComments={p.numComments}
              tags={p.tags}
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
          {comments.map(({ id, createdAt, creator, text }: any, key: any) => (
            <Box key={key}>
              <Comment
                id={id}
                createdAt={createdAt}
                creator={creator}
                body={MarkdownRenderer({ text })}
                Link={Link}
              />
            </Box>
          ))}
        </TabPanel>
      </Tabs>
    </>
  );
}
