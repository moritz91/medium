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
  color: #5C6AC4;
  &:hover {
    color: #202E78;
  }
}
::selection {
  color: #fff;
  background: #5C6AC4;
}
`;
