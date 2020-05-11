import {
  Caption,
  H4,
  Header,
  StoryFooterUsername,
  StoryHeading,
  StoryPreviewTitle,
  TopicTitle,
} from "components/heading/styles";
import React from "react";

const Heading: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (
  props,
): JSX.Element => {
  return <Header {...props}>{props.children}</Header>;
};

export default Heading;

export {
  Header,
  TopicTitle,
  StoryHeading,
  StoryPreviewTitle,
  StoryFooterUsername,
  H4,
  Caption,
};
