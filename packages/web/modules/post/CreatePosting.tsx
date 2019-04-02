import * as React from "react";
import * as yup from "yup";
import Layout from "../../components/Layout";
import { CreatePostingComponent } from "../../components/apollo-components";
import { Formik, Field } from "formik";
import { Router } from "../../server/routes";
import { InputField } from "../shared/formik-fields/InputField";
import { MyButton, MySelect } from "@medium/ui";

export const CreatePosting = (): JSX.Element => {
  return (
    <Layout title="Create Posting">
      <CreatePostingComponent>
        {mutate => (
          <Formik
            initialValues={{
              title: "",
              body: "",
              topicId: "491cc7bb-5567-4d04-a42e-290b53db8366"
            }}
            onSubmit={async ({ title, body, topicId }, { setErrors }) => {
              if (!title) {
                return setErrors({ title: "required" });
              }
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
                Router.pushRoute("post", {
                  id: response.data.createPosting.posting.id
                });
              }
            }}
            validationSchema={yup.object().shape({
              title: yup.string().required("required")
            })}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({ errors, handleSubmit, isSubmitting }) => {
              return (
                <div style={{ display: "flex", width: "100%" }}>
                  <form onSubmit={handleSubmit} style={{ flex: 1 }}>
                    <Field
                      errors={errors.title}
                      name="title"
                      component={InputField}
                      placeholder="Title"
                      icon="github"
                    />
                    <Field
                      errors={errors.body}
                      name="body"
                      component={InputField}
                      placeholder="Body"
                    />
                    <Field
                      name="topic"
                      placeholder="Topic"
                      component={MySelect}
                    />
                    <MyButton
                      variant="primary"
                      style={{
                        marginTop: "1rem",
                        marginLeft: "auto",
                        display: "flex"
                      }}
                      type="submit"
                      disabled={isSubmitting}
                    >
                      submit
                    </MyButton>
                  </form>
                </div>
              );
            }}
          </Formik>
        )}
      </CreatePostingComponent>
    </Layout>
  );
};
