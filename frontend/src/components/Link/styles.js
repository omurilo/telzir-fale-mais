import styled, { css } from "styled-components";

export const Link = styled.a`
  ${({ theme }) => css`
    width: 100%;
    color: ${theme.colors.secondary};
    margin-bottom: ${theme.spacing.little};
    padding: ${theme.spacing.default};
    text-transform: uppercase;

    position: relative;

    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      width: 0;
      left: 50%;
      border-bottom: 1px solid ${theme.colors.secondary};
      transition: ${theme.transition.default};
    }

    &:hover {
      &:after {
        width: 100%;
        left: 0;
        transform: translate(0, 0);
      }
    }
  `}
`;
