import React from "react";

import Logo from "components/Logo";

import * as Styled from "./styles";

function Header() {
  return (
    <Styled.Header>
      <Logo />
      <span>Menu?</span>
    </Styled.Header>
  );
}

export default Header;
