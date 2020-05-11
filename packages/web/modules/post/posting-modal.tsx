import { CreatePostingComponent } from "components/apollo-components";
import { Button } from "components/button";
import { Checkbox } from "components/common";
import { Caption, StoryPreviewTitle } from "components/heading";
import { Icon } from "components/icon";
import { FlyoutContextProps } from "context/flyout-context";
import {
  CreatePostContext,
  CreatePostContextProps,
} from "context/post-context";
import { TagContext } from "context/tag-context";
import { Field, Formik } from "formik";
import { getPostingsQuery } from "graphql/post/query/get-postings";
import { InputField } from "modules/shared/formik-fields/input-field";
import { TagInputField } from "modules/shared/formik-fields/tag-input-field";
import { TopicInputField } from "modules/shared/formik-fields/topic-input-field";
import React, { useContext, useEffect, useReducer, useState } from "react";
import Modal from "react-modal";
import { tagReducer } from "reducers/tag-reducer";
import { Router } from "server/routes";
import styled from "styled-components";
import { useInputValue } from "utils/use-input-value";
import * as yup from "yup";

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
    width: 1040,
  },
  overlay: {
    display: "flex",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    zIndex: 1000,
  },
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
  const [state, dispatch] = useReducer(tagReducer, initialState);
  useEffect(() => {
    console.log(state);
  }, [state]);

  const TagCtx: FlyoutContextProps = {
    dispatch,
    state,
  };

  return (
    <CreatePostingComponent
      refetchQueries={[
        {
          query: getPostingsQuery,
          variables: {
            input: {
              limit: 6,
              offset: 0,
            },
          },
        },
      ]}
    >
      {(mutate) => (
        <>
          <Modal
            isOpen={open}
            onRequestClose={() => changeOpen(false)}
            style={customStyles}
            bodyOpenClassName={""}
            portalClassName={"overlay"}
          >
            <TagContext.Provider value={TagCtx}>
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
                      cursor: "pointer",
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
                      fontSize: "14px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        height: 200,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          marginLeft: 80,
                          marginRight: 80,
                          lineHeight: "20px",
                          textAlign: "center",
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
                      previewSubtitle: "",
                    }}
                    onSubmit={async ({ previewTitle }, { setErrors }) => {
                      if (!previewTitle) {
                        return setErrors({ previewTitle: "required" });
                      }
                    }}
                    validationSchema={yup.object().shape({
                      previewTitle: yup.string().required("required"),
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
                      color: "rgba(0, 0, 0, 0.68)",
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
                      marginRight: 0,
                    }}
                    disabled={isSubmitting}
                    onClick={async () => {
                      const response = await mutate({
                        variables: {
                          posting: {
                            title,
                            previewTitle,
                            previewSubtitle,
                            body,
                          },
                          tagNames: tags.map((t) => t.name),
                          topicIds: [topicId],
                        },
                      });
                      if (response && response.data) {
                        Router.pushRoute("post", {
                          id: response.data.createPosting.posting.id,
                        });
                      }
                    }}
                  >
                    {isUpdate ? "Update" : "Publish now"}
                  </Button>
                </ModalPanel>
              </div>
            </TagContext.Provider>
          </Modal>
          <Button variant="primary" onClick={() => changeOpen(true)}>
            {isUpdate ? "Update" : "Publish"}
          </Button>
        </>
      )}
    </CreatePostingComponent>
  );
};
