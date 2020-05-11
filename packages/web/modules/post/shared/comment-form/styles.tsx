import styled from "styled-components";

export const FormContainer = styled.form`
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 0px;
  &.is-open {
    padding: 0px;
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
