import styled from "styled-components";

export const StoryContainer = styled.div`
  margin: 1.6rem 0px;
`;

export const CommentContainer = styled.div`
  width: 100%;
  margin: 1.6rem 0px 1rem 0px;
`;

export const StoryTags = styled.div``;

export const StoryPerformance = styled.div`
  display: flex;
  align-items: center;
`;

export const StoryMetaOptions = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const UserAvatar = styled.div`
  display: grid;
  grid-area: avatar / avatar / avatar / avatar;
`;

export const Actions = styled.div`
  grid-area: actions / actions / actions / actions;
`;

export const Content = styled.div`
  grid-area: content / content / content / content;
  padding: 0 10px;
`;

export const StoryFooter = styled.div`
  margin: 15px 0 0;
  padding: 15px 0 0;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
`;

export const TopRow = styled.div`
  display: grid;
  grid-template-areas: "avatar content actions";
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto;
  gap: 8px 8px;
  flex: 1 1 0%;
`;
