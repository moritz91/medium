import * as React from "react";
import { MyButton } from "@medium/ui";
import Link from "next/link";

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <a href="http://localhost:4000/auth/github">
          <MyButton variant="primary">login with github</MyButton>
        </a>
        <Link as={"posts"} href={"/posts"}>
          <MyButton variant="primary">
            <a>Posts</a>
          </MyButton>
        </Link>
      </div>
    );
  }
}
