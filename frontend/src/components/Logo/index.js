import React from "react";

import * as Styled from "./styles";

function Logo() {
  return (
    <div>
      <Styled.LogoItem>T</Styled.LogoItem>
      <Styled.LogoItem>E</Styled.LogoItem>
      <Styled.LogoItem>L</Styled.LogoItem>
      <Styled.LogoItem color="secondary" rotate={25} scale={1.25}>
        Z
      </Styled.LogoItem>
      <Styled.LogoItem>I</Styled.LogoItem>
      <Styled.LogoItem>R</Styled.LogoItem>
    </div>
  );
}

export default Logo;
