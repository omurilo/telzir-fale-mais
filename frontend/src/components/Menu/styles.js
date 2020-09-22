import styled from "styled-components";
import { Link } from "components/Link/styles";

export const Container = styled.nav`
  display: none;

  align-items: center;
  justify-content: flex-start;

  @media (min-width: 1024px) {
    display: flex;
  }
`;

export const LinkItem = styled(Link)``;
