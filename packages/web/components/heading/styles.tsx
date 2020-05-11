import styled from "styled-components";
import { headerFont } from "utils/fonts";

const Header = styled.h2`
  text-transform: uppercase;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  letter-spacing: -0.04px;
  font-size: 13px;
  line-height: 16px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.84);
  font-family: ${headerFont};
  margin-top: ${(props: any) => props.mt || ""};
`;

const TopicTitle = styled.h3`
  letter-spacing: -0.62px;
  font-size: 24px;
  max-height: 64px;
  line-height: 32px;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  font-weight: 600;
  text-align: inherit;
  font-style: normal;
  overflow: hidden;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  color: rgba(0, 0, 0, 0.84);
  word-break: break-word;
  font-family: ${headerFont};
`;

const StoryHeading = styled.h3`
  letter-spacing: -0.32px;
  font-size: 25px;
  max-height: 48px;
  line-height: 24px;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  font-weight: 600;
  text-align: inherit;
  font-style: normal;
  overflow: hidden;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  color: rgba(0, 0, 0, 0.84);
  word-break: break-word;
  font-family: ${headerFont};
`;

const StoryPreviewTitle = styled.h3`
  letter-spacing: -0.32px;
  font-size: 19px;
  max-height: 48px;
  line-height: 24px;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  font-weight: 600;
  text-align: inherit;
  font-style: normal;
  overflow: hidden;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  color: rgba(0, 0, 0, 0.84);
  word-break: break-word;
  font-family: ${headerFont};
`;

const StoryFooterUsername = styled.h3`
  letter-spacing: -0.32px;
  font-size: 16px;
  max-height: 48px;
  line-height: 24px;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  font-weight: 600;
  text-align: inherit;
  font-style: normal;
  overflow: hidden;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  color: rgba(0, 0, 0, 0.84);
  word-break: break-word;
  font-family: ${headerFont};
`;

const H4 = styled.h4`
  letter-spacing: -0.17px;
  font-size: 15px;
  text-overflow: ellipsis;
  font-weight: 600;
  line-height: 20px;
`;

const Caption = styled.p`
  font-size: 14px;
`;

export {
  Header,
  TopicTitle,
  StoryHeading,
  StoryPreviewTitle,
  StoryFooterUsername,
  H4,
  Caption,
};
