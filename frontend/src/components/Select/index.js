import React from "react";

import * as Styled from "./styles";

const SelectComponent = ({
  name,
  label,
  dimension,
  marginTop,
  primary,
  ...rest
}) => {
  return (
    <Styled.Container size={dimension} marginTop={marginTop}>
      <Styled.Select name={name} inputId={name} {...rest} />
      <Styled.Label htmlFor={name} primary={primary}>
        {label}
      </Styled.Label>
    </Styled.Container>
  );
};

export default SelectComponent;
