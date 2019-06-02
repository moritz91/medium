import * as React from "react";
import * as yup from "yup";
import Layout from "../../components/layout";
import { Formik, Field } from "formik";
import { InputField } from "../shared/formik-fields/InputField";
import { PostingModal } from "./postingModal";
import { CreatePostContext } from "./shared/postContext";
import { useState } from "react";

export const CreatePosting = (): JSX.Element => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  return (
    <Layout title="Create Posting">
      <Formik
        initialValues={{
          title: "",
          body: ""
        }}
        onSubmit={async ({ title }, { setErrors }) => {
          if (!title) {
            return setErrors({ title: "required" });
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
            <div>
              <form onSubmit={handleSubmit}>
                <Field
                  errors={errors.title}
                  name="title"
                  component={InputField}
                  placeholder="Title"
                  onChange={(e: any) => setTitle(e.target.value)}
                  value={title}
                />
                <Field
                  errors={errors.body}
                  name="body"
                  component={InputField}
                  placeholder="Body"
                  onChange={(e: any) => setBody(e.target.value)}
                  value={body}
                />
              </form>
              <CreatePostContext.Provider value={{ title, body, isSubmitting }}>
                <PostingModal />
              </CreatePostContext.Provider>
            </div>
          );
        }}
      </Formik>
    </Layout>
  );
};
