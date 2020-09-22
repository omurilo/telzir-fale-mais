import React from "react";

import Logo from "components/Logo";
import Menu from "components/Menu";
import MobileMenu from "components/MobileMenu";

import * as Styled from "./styles";

function Header() {
  return (
    <Styled.Header>
      <Logo />
      <Menu />
      <MobileMenu />
    </Styled.Header>
  );
}

export default Header;
