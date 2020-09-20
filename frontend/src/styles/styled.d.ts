import "styled-components";

import theme from "./theme";

type Theme = typeof theme;

declare module "styled-components" {
  export interface DefaultTheme {
    colors: Theme["colors"];
    fontSizes: Theme["fontSizes"];
    spacing: Theme["spacing"];
    transition: Theme["transition"];
    radius: Theme["radius"];
  }
}
