import React, { useContext } from "react";
import { TabList, Tabs, Tab, TabPanel } from "../../components/tabs/tabs";
import { Comment } from "../../components/comment";
import { Link } from "../../server/routes";
import { Box } from "rebass";
import { MarkdownRenderer } from "../post/shared/markdownEditor/markdownRenderer";
import { ProfilePostItem } from "../../components/profilePostItem";
import { PostsContext } from "../../context/PostContext";
import { CommentInfoFragment } from "../../components/apollo-components";

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
              {
                id,
                createdAt,
                creator,
                isAuthor,
                text,
                numReactions,
                hasReacted,
                replies,
              }: CommentInfoFragment,
              key: number,
            ) => (
              <Box
                key={key}
                style={{ display: "flex", flexDirection: "column" }}
              >
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
