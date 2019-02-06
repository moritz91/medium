import * as React from "react";
import { BigCard, Wrapper } from "@medium/ui";
import { Heading, Text } from "rebass";

import Layout from "../components/Layout";

export default class CreatePost extends React.PureComponent {
  render() {
    return (
      // @ts-ignore
      <Layout title={`Create Posting`}>
        <Wrapper>
          <BigCard>
            <Heading mb="1rem" fontFamily="rubik" fontSize={3}>
              Title
            </Heading>
            <Text className={"Body"} fontSize={2} mb="1rem">
              Post Body
            </Text>
          </BigCard>
        </Wrapper>
      </Layout>
    );
  }
}
