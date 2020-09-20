import styled from "styled-components";

export const Title = styled.h1.attrs(({ variant }) => ({
  as: variant,
}))`
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
`;
