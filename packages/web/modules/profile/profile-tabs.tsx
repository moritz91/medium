import { CommentInfoFragment } from "components/apollo-components";
import Comment from "components/comment";
import { ProfilePostItem } from "components/profile-post-item";
import { Tab, TabList, TabPanel, Tabs } from "components/tabs";
import { PostsContext } from "context/post-context";
import { MarkdownRenderer } from "modules/post/shared/markdown-editor/renderer";
import React, { useContext } from "react";
import { Box } from "rebass";
import { Link } from "server/routes";

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
          {postings?.map((p: any) => (
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
                  id: p.id,
                },
              })}
            />
          ))}
        </TabPanel>
        <TabPanel name="responses">
          {comments?.map(
            (
              { id, createdAt, creator, isAuthor, text, numReactions, hasReacted, replies }: CommentInfoFragment,
              key: number,
            ) => (
              <Box key={key} style={{ display: "flex", flexDirection: "column" }}>
                <Comment
                  id={id}
                  createdAt={createdAt}
                  creator={creator}
                  isAuthor={isAuthor}
                  body={MarkdownRenderer({ text })}
                  numReactions={numReactions}
                  hasReacted={hasReacted}
                  replies={replies}
                />
              </Box>
            ),
          )}
        </TabPanel>
      </Tabs>
    </>
  );
}
