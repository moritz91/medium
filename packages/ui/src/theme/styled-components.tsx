// styled-components.ts
import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";

import { ITheme } from ".";

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<ITheme>;

export { css, createGlobalStyle, keyframes, ThemeProvider, styled };
export default styled;
export const GlobalStyle = createGlobalStyle`
body {
  background-color: #242b38;
  color: rgb(233, 236, 241);
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  font-family: medium-content-sans-serif-font,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif;
  overflow-y: scroll;
}
* {
  outline: none;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
html {
  font-size: 62.5%;
}
a {
  text-decoration: none;
  cursor: pointer;
  color: rgb(233, 236, 241);
  &:hover {
    color: #fff;
  }
}
`;
