import { Layout } from "components/layout";
import { CreatePostContext } from "context/post-context";
import { Field, Formik } from "formik";
import { getPostingByIdQuery } from "graphql/post/query/get-posting-by-id";
import { PostingModal } from "modules/post/posting-modal";
import { InputField } from "modules/shared/formik-fields/input-field";
import React, { useState } from "react";
import { NextContextWithApollo } from "types/next-context-with-apollo";
import * as yup from "yup";

export const CreatePosting = (props: any): JSX.Element => {
  const { getPostingById } = props;
  const [title, setTitle] = useState(
    getPostingById ? getPostingById.title : "",
  );
  const [body, setBody] = useState(getPostingById ? getPostingById.body : "");
  const tags = getPostingById ? getPostingById.tags : [];
  const isUpdate = getPostingById ? true : false;

  return (
    <Layout title={getPostingById ? "Update Posting" : "Create Posting"}>
      <Formik
        initialValues={{
          title: "",
          body: "",
        }}
        onSubmit={async ({ title }, { setErrors }) => {
          if (!title) {
            return setErrors({ title: "required" });
          }
        }}
        validationSchema={yup.object().shape({
          title: yup.string().required("required"),
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
              <CreatePostContext.Provider
                value={{ title, body, tags, isSubmitting, isUpdate }}
              >
                <PostingModal />
              </CreatePostContext.Provider>
            </div>
          );
        }}
      </Formik>
    </Layout>
  );
};

CreatePosting.getInitialProps = async ({
  query: { id },
  apolloClient,
}: NextContextWithApollo) => {
  if (id) {
    const response: any = await apolloClient.query({
      query: getPostingByIdQuery,
      variables: {
        id: id,
      },
    });

    const { getPostingById } = response.data;

    return {
      getPostingById,
    };
  }
  return {};
};
