import * as React from "react";
import { MyButton } from "@medium/ui";

export default class Home extends React.Component {
  render() {
    return (
      <a href="http://localhost:4000/auth/github">
        <MyButton variant="primary">login with github</MyButton>
      </a>
    );
  }
}
