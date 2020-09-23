import React from "react";

import * as Styled from "./styles";

function Title({ children, variant }) {
  return <Styled.Title variant={variant}>{children}</Styled.Title>;
}

export default Title;
