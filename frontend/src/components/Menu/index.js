import React from "react";
import Link from "next/link";

import * as Styled from "./styles";

function Menu() {
  return (
    <Styled.Container>
      <Link href="/" passHref>
        <Styled.LinkItem>Calcula aí!</Styled.LinkItem>
      </Link>
      <Link href="/about" passHref>
        <Styled.LinkItem>Sobre</Styled.LinkItem>
      </Link>
    </Styled.Container>
  );
}

export default Menu;
