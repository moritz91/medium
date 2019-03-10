import * as React from "react";
import { useInputValue } from "../../../utils/useInputValue";
import { CreateCommentComponent } from "../../../components/apollo-components";
import { getCommentsByIdQuery } from "../../../graphql/comment/query/getCommentsById";
import Modal from "react-modal";
import { Icon, Input, MyButton } from "@medium/ui";

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

export const CreateCommentModal = () => {
  const [open, changeOpen] = React.useState(false);
  // const [item] = React.useState(null);
  const [text, changeText] = useInputValue("");

  return (
    <CreateCommentComponent
      refetchQueries={[
        {
          query: getCommentsByIdQuery,
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
              style={{ minHeight: 100 }}
              placeholder="Content"
              value={text}
              onChange={changeText}
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
                      comment: {
                        postingId: "e9564cfd-d621-4fcf-b8b2-aac8a4e30f8f",
                        text
                      }
                    }
                  });
                  if (response && response.data) {
                    changeOpen(false);
                  }
                }}
              >
                Publish
              </MyButton>
            </div>
          </Modal>
          <MyButton variant="primary" onClick={() => changeOpen(true)}>
            ADD COMMENT
          </MyButton>
        </>
      )}
    </CreateCommentComponent>
  );
};
