import * as React from "react";
import { useInputValue } from "../../../utils/useInputValue";
import { CreatePostingComponent } from "../../../components/apollo-components";
import { getPostingsQuery } from "../../../graphql/post/query/getPostings";
import Modal from "react-modal";
import { Icon, Input, MyButton } from "@medium/ui";
import redirect from "../../../lib/redirect";

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
    width: 850,
    height: 400
  },
  overlay: {
    backgroundColor: "none"
  }
};

export const CreatePostingModal = () => {
  const [open, changeOpen] = React.useState(false);
  // const [item] = React.useState(null);
  const [title, changeTitle] = useInputValue("");
  const [body, changeBody] = useInputValue("");
  const [topicId] = useInputValue("");

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
            <Input
              style={{ marginBottom: "2rem" }}
              placeholder="Title"
              value={title}
              onChange={changeTitle}
            />
            <Input
              style={{ minHeight: 100 }}
              placeholder="Content"
              value={body}
              onChange={changeBody}
            />
            <div style={{ display: "flex" }}>
              <MyButton
                variant="form"
                style={{
                  marginLeft: "auto",
                  marginTop: "2rem",
                  marginRight: 0
                }}
                onClick={async () => {
                  const response = await mutate({
                    variables: {
                      posting: {
                        title,
                        body,
                        topicId
                      }
                    }
                  });
                  if (response && response.data) {
                    redirect(
                      {},
                      `/p/${response.data.createPosting.posting.id}`
                    );
                  }
                }}
              >
                Publish
              </MyButton>
            </div>
          </Modal>
          <MyButton variant="primary" onClick={() => changeOpen(true)}>
            NEW STORY
          </MyButton>
        </>
      )}
    </CreatePostingComponent>
  );
};
