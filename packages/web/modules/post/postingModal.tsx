import * as React from "react";
import Modal from "react-modal";
import * as yup from "yup";
import { CreatePostingComponent } from "../../components/apollo-components";
import { getPostingsQuery } from "../../graphql/post/query/getPostings";
import { useInputValue } from "../../utils/useInputValue";
import { TagInputField } from "../shared/formik-fields/TagInputField";
import { TopicInputField } from "../shared/formik-fields/TopicInputField";
import {
  CreatePostContextProps,
  CreatePostContext
} from "../../components/context/PostContext";
import { useContext, useState, useReducer, createContext } from "react";
import { Router } from "../../server/routes";
import { useEffect } from "react";
import { Icon } from "../../components/icon";
import { Button } from "../../components/button";
import styled from "styled-components";
import { Caption, StoryPreviewTitle } from "../../components/heading";
import { Formik, Field } from "formik";
import { InputField } from "../shared/formik-fields/InputField";
import { Checkbox } from "../../components/common/checkbox";

const ModalPanel = styled.div`
  line-height: 20px;
  font-size: 16px;
  text-align: left;
  width: 50%;
  padding: 40px;
  flex: 1 1 auto;
`;

const customStyles = {
  content: {
    position: "",
    top: "",
    bottom: "",
    left: "",
    right: "",
    borderRadius: 0,
    border: "",
    overflow: "hidden",
    margin: "auto",
    padding: "100px 0px",
    width: 1040
  },
  overlay: {
    display: "flex",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    zIndex: 1000
  }
};

export const TagDispatch = createContext<any>({
  type: "",
  action: ""
});

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "add":
      return [...state, { id: state.length, name: action.tag }];
    case "remove":
      return state.filter((_: any, idx: number) => idx != action.idx);
    default:
      throw new Error();
  }
};

export const PostingModal = () => {
  const [open, changeOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [topicId] = useInputValue("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewSubtitle, setPreviewSubtitle] = useState("");

  const { title, body, tags, isSubmitting, isUpdate } = useContext<
    CreatePostContextProps
  >(CreatePostContext);
  const initialState = tags ? tags : ([] as any);
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    console.log(state);
  }, [state]);

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
            bodyOpenClassName={""}
            portalClassName={"overlay"}
          >
            <TagDispatch.Provider value={dispatch}>
              <div style={{ display: "flex" }}>
                <Button
                  variant="action"
                  style={{ position: "absolute", top: 0, right: 0 }}
                >
                  <Icon
                    size={24}
                    name="x"
                    fill="#0d0d0d"
                    style={{
                      cursor: "pointer"
                    }}
                    onClick={() => changeOpen(false)}
                  />
                </Button>
                <ModalPanel>
                  <StoryPreviewTitle>Story Preview</StoryPreviewTitle>
                  <div
                    style={{
                      marginTop: "10px",
                      marginBottom: "10px",
                      background: "#fafafa",
                      width: "100%",
                      fontSize: "14px"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        height: 200,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <span
                        style={{
                          marginLeft: 80,
                          marginRight: 80,
                          lineHeight: "20px",
                          textAlign: "center"
                        }}
                      >
                        Include a high-quality image in your story to make it
                        more inviting to readers.
                      </span>
                    </div>
                  </div>
                  <Formik
                    initialValues={{
                      previewTitle: "",
                      previewSubtitle: ""
                    }}
                    onSubmit={async ({ previewTitle }, { setErrors }) => {
                      if (!previewTitle) {
                        return setErrors({ previewTitle: "required" });
                      }
                    }}
                    validationSchema={yup.object().shape({
                      previewTitle: yup.string().required("required")
                    })}
                    validateOnBlur={false}
                    validateOnChange={false}
                  >
                    {({ errors, handleSubmit }) => {
                      return (
                        <form onSubmit={handleSubmit}>
                          <Field
                            errors={errors.previewTitle}
                            name="previewTitle"
                            component={InputField}
                            placeholder="Write a preview title"
                            onChange={(e: any) =>
                              setPreviewTitle(e.target.value)
                            }
                            value={previewTitle}
                          />
                          <Field
                            errors={errors.previewSubtitle}
                            name="previewSubtitle"
                            component={InputField}
                            placeholder="Write a preview subtitle..."
                            onChange={(e: any) =>
                              setPreviewSubtitle(e.target.value)
                            }
                            value={previewSubtitle}
                          />
                        </form>
                      );
                    }}
                  </Formik>
                  <Caption
                    style={{
                      marginTop: 10,
                      marginBottom: 20,
                      fontWeight: 400,
                      color: "rgba(0, 0, 0, 0.68)"
                    }}
                  >
                    <strong style={{ fontWeight: 700 }}>Note:</strong> Changes
                    here will affect how your story appears in public places
                    like Medium’s homepage — not the story itself.
                  </Caption>
                </ModalPanel>
                <ModalPanel>
                  <TopicInputField />
                  <TagInputField />
                  <Checkbox
                    checked={checked}
                    onClick={() => setChecked(!checked)}
                  >
                    Allow curators to recommend my story to interested readers.{" "}
                    <strong style={{ fontWeight: 700 }}>
                      Recommended stories are part of Medium’s metered paywall.
                    </strong>
                  </Checkbox>
                  <Button
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
                            previewTitle,
                            previewSubtitle,
                            body
                          },
                          tagNames: tags.map(t => t.name),
                          topicIds: [topicId]
                        }
                      });
                      if (response && response.data) {
                        Router.pushRoute("post", {
                          id: response.data.createPosting.posting.id
                        });
                      }
                    }}
                  >
                    {isUpdate ? "Update" : "Publish now"}
                  </Button>
                </ModalPanel>
              </div>
            </TagDispatch.Provider>
          </Modal>
          <Button variant="primary" onClick={() => changeOpen(true)}>
            {isUpdate ? "Update" : "Publish"}
          </Button>
        </>
      )}
    </CreatePostingComponent>
  );
};
