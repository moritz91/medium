import * as React from "react";
import * as yup from "yup";
import Layout from "../../components/Layout";
import { Formik, Field } from "formik";
import { InputField } from "../shared/formik-fields/InputField";
import { PublishPostingModal } from "../shared/PublishPostingModal";
import { CreatePostContext } from "./shared/PostContext";

export const CreatePosting = (): JSX.Element => {
  return (
    <Layout title="Create Posting">
      <Formik
        initialValues={{
          title: "",
          body: "",
          topicId: "",
          topic: "",
          tagName: ""
        }}
        onSubmit={async (
          { title, body, topicId, topic, tagName },
          { setErrors }
        ) => {
          if (!title) {
            return setErrors({ title: "required" });
          }
          console.log(title, body, topicId, topic, tagName);
        }}
        validationSchema={yup.object().shape({
          title: yup.string().required("required")
        })}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ errors, handleSubmit, isSubmitting }) => {
          return (
            <div>
              <form onSubmit={handleSubmit} style={{ flex: 1 }}>
                <Field
                  errors={errors.title}
                  name="title"
                  component={InputField}
                  placeholder="Title"
                />
                <Field
                  errors={errors.body}
                  name="body"
                  component={InputField}
                  placeholder="Body"
                />
              </form>
              <CreatePostContext.Provider value={{ title, body, isSubmitting }}>
                <PublishPostingModal />
              </CreatePostContext.Provider>
            </div>
          );
        }}
      </Formik>
    </Layout>
  );
};
