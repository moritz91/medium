import * as React from "react";
import { Footer as FooterWrapper, Pane, Section } from "@medium/ui";

export class Footer extends React.PureComponent {
  render() {
    return (
      <FooterWrapper>
        <Section>
          <Pane />
          <Pane />
          <Pane />
        </Section>
      </FooterWrapper>
    );
  }
}
