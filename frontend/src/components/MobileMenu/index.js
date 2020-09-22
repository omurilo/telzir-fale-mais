import React, { useState } from "react";
import Link from "next/link";

import * as Styled from "./styles";

const LinkButton = React.forwardRef(({ onClick, href, children }, ref) => {
  return (
    <Styled.LinkItem href={href} onClick={onClick} ref={ref}>
      {children}
    </Styled.LinkItem>
  );
});

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <>
      <Styled.MenuIcon
        onClick={toggleMenu}
        className={`${isOpen ? "active" : null}`}
      />
      <Styled.Container isOpen={isOpen}>
        <Link passHref href="/">
          <LinkButton onClick={toggleMenu}>Calcula aí!</LinkButton>
        </Link>
        <Link passHref href="/about">
          <LinkButton onClick={toggleMenu}>Sobre</LinkButton>
        </Link>
      </Styled.Container>
    </>
  );
}

export default MobileMenu;
