import styled, { css } from "styled-components";

export const Main = styled.main`
  ${({ theme }) => css`
    width: 100%;
    padding: ${theme.spacing.big};

    & > p {
      margin-top: ${theme.spacing.small};
      line-height: 1.8rem;
      letter-spacing: 0.05em;
      font-size: ${theme.fontSizes.large};
    }

    @media (min-width: 1280px) {
      max-width: 1280px;
      margin-right: auto;
      margin-left: auto;
    }
  `}
`;

export const Table = styled.table`
  ${({ theme }) => css`
    width: 100%;
    margin-top: ${theme.spacing.extreme};

    & th,
    & td {
      border: 1px solid ${theme.colors.lightGrey};
      padding: ${theme.spacing.small};

      & > strong {
        color: ${theme.colors.secondary};
      }
    }

    & th {
      color: ${theme.colors.primary};
      flex: 1;
    }

    & td {
      text-align: center;
    }

    @media (min-width: 768px) {
      max-width: 32rem;
      margin-right: auto;
      margin-left: auto;
    }
  `}
`;
