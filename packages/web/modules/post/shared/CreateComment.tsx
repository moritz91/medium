import React, { useContext } from "react";
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
import { PostContext } from "./PostContext";
import Textarea from "react-textarea-autosize";
import styled from "styled-components";

const StyledTextarea = styled(Textarea)`
  padding-left: 0.8rem;
  margin-right: auto;
  margin-bottom: 1rem;
  margin-top: 10px;
  width: 100%;
  overflow: hidden;
  background-color: #242b38;
  border: none;
  font-size: 1.4rem;
  line-height: 1.58;
  color: rgb(233, 236, 241);
  resize: none;
  &::placeholder {
    color: rgb(233, 236, 241);
  }
  &::-webkit-input-placeholder {
    color: rgb(233, 236, 241);
  }
  &:-moz-placeholder {
    color: rgb(233, 236, 241);
  }
  &:-ms-input-placeholder {
    color: rgb(233, 236, 241);
  }
`;

export const CreateComment = () => {
  const [text, changeText] = useInputValue("");
  const { postingId } = useContext(PostContext);
  return (
    <CreateCommentComponent
      refetchQueries={[
        {
          query: getCommentsByIdQuery,
          variables: {
            input: {
              postingId
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
                        <StyledTextarea
                          placeholder="Write a response..."
                          value={text}
                          onChange={changeText}
                        />
                      </Flex>
                      <MyButton
                        variant="primary"
                        type="submit"
                        style={{
                          marginLeft: "auto",
                          marginRight: 0,
                          display: "flex"
                        }}
                        onClick={async () => {
                          await mutate({
                            variables: {
                              comment: {
                                postingId,
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

                return null;
              }}
            </MeComponent>
          </PostRowContainer>
        </>
      )}
    </CreateCommentComponent>
  );
};
