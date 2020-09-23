import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import Theme from "styles/theme";
import GlobalStyles from "styles/global";

const Providers = ({ children }) => {
  return (
    <ThemeProvider theme={Theme}>
      {children}
      <GlobalStyles />
    </ThemeProvider>
  );
};

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: Providers, ...options });

export * from "@testing-library/react";

export { customRender as render };
