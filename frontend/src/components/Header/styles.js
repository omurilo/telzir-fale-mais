import styled, { css } from "styled-components";

export const Header = styled.header`
  ${({ theme }) => css`
    height: 4rem;
    min-height: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${theme.spacing.horizontal};

    & > div {
      display: flex;
      align-items: center;
    }
  `}
`;
