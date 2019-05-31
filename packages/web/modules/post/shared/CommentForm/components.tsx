import { styled } from "@medium/ui";

export const FormRow = styled.div`
  padding: 1rem 0.9rem;
`;

export const FormContainer = styled.form`
  width: 100%;
  box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.12),
    0 0.1rem 0.2rem rgba(0, 0, 0, 0.24);
  border-top: ${(p: { isReply: boolean; view: string }) =>
    p.isReply ? "none" : "1px solid #d1d5da"};
  border-bottom: ${p =>
    p.view === "repo-view" ? "none" : "1px solid #d1d5da"};
  display: flex;
  flex-direction: column;
  padding: ${(p: { isReply: boolean }) => (p.isReply ? "0" : "0 0.9rem")};
  &.is-open {
    padding: ${(p: { isReply: boolean }) => (p.isReply ? "0" : "0.9rem")};
  }
  /* Tooltip text */
  .start-tooltip + .tooltiptext {
    border-radius: 3px;
    background-color: #f4f6dd;
    font-size: 1em;
    padding: 0.6rem 1rem;
    position: absolute;
    left: 15em;
    text-align: center;
    visibility: hidden;
    z-index: 1;
  }
  .start-tooltip:focus + .tooltiptext {
    visibility: visible;
  }
  & .editor-outer-box {
    border-radius: 3px;
    margin: 1rem 0.9rem;
    padding: 0;
  }
  & .editor-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    & a {
      display: flex;
      align-items: center;
      & svg {
        margin-right: 1rem;
      }
    }
    & .btn-box {
      display: flex;
      justify-content: flex-end;
      padding: 0.8em 0.4em;
      & button {
        min-width: 6em;
      }
    }
  }
`;
