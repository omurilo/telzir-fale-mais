import React from "react";

import Logo from "components/Logo";

import * as Styled from "./styles";

const Footer = () => {
  return (
    <Styled.Footer>
      <Logo />
      <div>
        <Styled.FaceIcon size="32" />
        <Styled.TwitterIcon size="32" />
      </div>
    </Styled.Footer>
  );
};

export default Footer;
