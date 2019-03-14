import * as React from "react";
import { useInputValue } from "../../../utils/useInputValue";
import {
  CreateCommentComponent,
  MeComponent
} from "../../../components/apollo-components";
import { getCommentsByIdQuery } from "../../../graphql/comment/query/getCommentsById";
import { MyButton, Avatar, PostRowContainer } from "@medium/ui";
import { Flex } from "rebass";
import { Link } from "../../../server/routes";
import { get } from "lodash";

export const CreateComment = (postingId: any) => {
  // const [item] = React.useState(null);
  const [text, changeText] = useInputValue("");
  const { postingId: id } = postingId;
  return (
    <CreateCommentComponent
      refetchQueries={[
        {
          query: getCommentsByIdQuery,
          variables: {
            input: {
              postingId: id
            }
          }
        }
      ]}
    >
      {mutate => (
        <>
          <PostRowContainer>
            <MeComponent>
              {({ data, loading }) => {
                if (loading) {
                  return null;
                }

                let isLoggedIn = !!get(data, "me", false);

                if (data && data.me && isLoggedIn) {
                  const { pictureUrl, username } = data!.me!;

                  return (
                    <div>
                      <Flex>
                        <Link route={"profile"} params={{ username }}>
                          <Avatar
                            borderRadius={3}
                            size={34}
                            src={pictureUrl}
                            alt="avatar"
                          />
                        </Link>
                        <textarea
                          style={{
                            padding: 10,
                            width: "100%",
                            overflow: "hidden",
                            minHeight: 100,
                            backgroundColor: "#242b38",
                            border: "none",
                            color: "white",
                            fontSize: "1.4rem",
                            lineHeight: "1.58",
                            resize: "none"
                          }}
                          placeholder="Write a response..."
                          value={text}
                          onChange={changeText}
                        />
                      </Flex>
                      <MyButton
                        variant="primary"
                        style={{
                          marginLeft: "auto",
                          marginTop: "2rem",
                          marginRight: 0
                        }}
                        onClick={async () => {
                          await mutate({
                            variables: {
                              comment: {
                                postingId: id,
                                text
                              }
                            }
                          });
                        }}
                      >
                        Publish
                      </MyButton>
                    </div>
                  );
                }

                return <div />;
              }}
            </MeComponent>
          </PostRowContainer>
        </>
      )}
    </CreateCommentComponent>
  );
};
