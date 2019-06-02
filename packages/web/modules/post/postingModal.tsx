import { Icon, MyButton } from "@medium/ui";
import * as React from "react";
import Modal from "react-modal";
import { CreatePostingComponent } from "../../components/apollo-components";
import { getPostingsQuery } from "../../graphql/post/query/getPostings";
import { useInputValue } from "../../utils/useInputValue";
import { TagInputField } from "../shared/formik-fields/TagInputField";
import { TopicInputField } from "../shared/formik-fields/TopicInput";
import {
  CreatePostContextProps,
  CreatePostContext
} from "./shared/postContext";
import { useContext, useState } from "react";
import { Router } from "../../server/routes";
import { useEffect } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "",
    borderRadius: "0px",
    width: 1040,
    height: 400,
    animation: "fade-in-pulse-08 .3s forwards cubic-bezier(.8,.02,.45,.91)"
  },
  overlay: {
    backgroundColor: "none"
  }
};

export const PostingModal = () => {
  const [open, changeOpen] = useState(false);
  const [topicId] = useInputValue("");
  const [tagName] = useInputValue("");
  const [selectedTags, setSelectedTags] = useState([]);

  const handleSelectedTags = (tags: any): void => {
    return setSelectedTags(tags);
  };

  useEffect(() => {
    console.log(title, body, selectedTags, isSubmitting);
  }, [selectedTags]);

  const { title, body, isSubmitting } = useContext<CreatePostContextProps>(
    CreatePostContext
  );

  return (
    <CreatePostingComponent
      refetchQueries={[
        {
          query: getPostingsQuery,
          variables: {
            input: {
              limit: 6,
              offset: 0
            }
          }
        }
      ]}
    >
      {mutate => (
        <>
          <Modal
            isOpen={open}
            onRequestClose={() => changeOpen(false)}
            style={customStyles}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "2rem",
                alignItems: "center"
              }}
            >
              <Icon
                size={24}
                name="x"
                fill="#0d0d0d"
                style={{
                  cursor: "pointer",
                  marginLeft: "97%"
                }}
                onClick={() => changeOpen(false)}
              />
            </div>
            <div style={{ display: "flex" }}>
              <TopicInputField />
              <TagInputField onSelectTags={handleSelectedTags} />
            </div>
            <div style={{ display: "flex" }}>
              <MyButton
                variant="primary"
                style={{
                  marginLeft: "auto",
                  marginTop: "2rem",
                  marginRight: 0
                }}
                disabled={isSubmitting}
                onClick={async () => {
                  const response = await mutate({
                    variables: {
                      posting: {
                        title,
                        body,
                        topicId,
                        tagName
                      }
                    }
                  });
                  if (response && response.data) {
                    Router.pushRoute("post", {
                      id: response.data.createPosting.posting.id
                    });
                  }
                }}
              >
                Publish
              </MyButton>
            </div>
          </Modal>
          <MyButton variant="primary" onClick={() => changeOpen(true)}>
            Publish
          </MyButton>
        </>
      )}
    </CreatePostingComponent>
  );
};
