import styled, { css } from "styled-components";

interface ContainerProps extends React.HTMLProps<HTMLDivElement> {
  targetState: boolean | undefined;
  targetId: string | undefined;
  id: string;
}

const CommentContainer = styled.div<ContainerProps>`
  width: 100%;
  padding: 11px;
  margin: 1.6rem 0px 1rem 0px;
  border-radius: 3px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);

  ${({ targetState, targetId, id }) =>
    targetId === id &&
    targetState &&
    css`
      border-color: #2188ff;
      box-shadow: 0 0px 5px #5c6ac4;
    `}
`;

const TopRow = styled.div`
  display: grid;
  grid-template-areas: "avatar content";
  grid-template-columns: auto 1fr;
  grid-template-rows: auto;
  gap: 8px 8px;
  flex: 1 1 0%;
`;

const UserAvatar = styled.div`
  display: grid;
  grid-area: avatar / avatar / avatar / avatar;
`;

const Actions = styled.div`
  display: grid;
  grid-area: actions / actions / actions / actions;
`;

const Content = styled.div`
  display: grid;
  grid-area: content / content / content / content;
`;

export { CommentContainer, TopRow, UserAvatar, Actions, Content };
