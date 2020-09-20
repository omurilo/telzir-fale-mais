import React from "react";

import * as Styled from "./styles";

function Button({ children, ...props }) {
  return <Styled.Button {...props}>{children}</Styled.Button>;
}

export default Button;
