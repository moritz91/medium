import * as React from "react";
import { useInputValue } from "../../../utils/useInputValue";
import { CreatePostingComponent } from "../../../components/apollo-components";
import { getPostingsQuery } from "../../../graphql/post/query/getPostings";
import Modal from "react-modal";
import { Heading } from "rebass";
import { Icon, Input, MyButton } from "@medium/ui";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    height: 500,
    backgroundColor: "#f9fbfd"
  }
};

export const CreatePostingModal = () => {
  const [open, changeOpen] = React.useState(false);
  // const [item] = React.useState(null);
  const [title, changeTitle] = useInputValue("");
  const [body, changeBody] = useInputValue("");

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
              <Heading color="#07385A" fontSize={6}>
                NEW POSTING
              </Heading>
              <Icon
                size={24}
                name="x"
                fill="#0d0d0d"
                style={{
                  cursor: "pointer"
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
              style={{ marginBottom: "2rem" }}
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
                        body
                      }
                    }
                  });
                  console.log(response);
                  if (response && response.data) {
                    changeOpen(false);
                  }
                }}
              >
                Publish
              </MyButton>
            </div>
          </Modal>
          <MyButton variant="form" onClick={() => changeOpen(true)}>
            NEW POSTING
          </MyButton>
        </>
      )}
    </CreatePostingComponent>
  );
};
