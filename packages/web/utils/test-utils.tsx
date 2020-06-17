import { render } from "@testing-library/react";
import theme from "components/theme";
import { ThemeProvider } from "styled-components";

const AllTheProviders = ({ children }: any) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const customRender = (ui: any, options: any) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";
// override render method
export { customRender as render };
