import React from "react";

import * as Styled from "./styles";

function Input({ children, label, name, ...props }) {
  return (
    <Styled.InputContainer>
      <Styled.Input tabIndex={0} name={name} id={name} {...props} />
      <Styled.InputLabel htmlFor={name}>{label}</Styled.InputLabel>
      {children}
    </Styled.InputContainer>
  );
}

export default Input;
