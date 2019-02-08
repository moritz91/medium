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
  const [item, changeItem] = React.useState(null);
  const [title, changeTitle] = useInputValue("");

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
                Create Posting
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
              <Input
                style={{ marginBottom: "2rem" }}
                placeholder="Descriptive title"
                value={title}
                onChange={changeTitle}
              />
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
