import styled, { css } from "styled-components";

export const Container = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacing.big} ${theme.spacing.vertical};
    margin-top: ${theme.spacing.big};
    border-top: 1px solid ${theme.colors.lightGrey};
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    /* flex-direction: column; */
    flex-wrap: wrap;
    animation: showResults 0.8s ease-in-out;

    @media (min-width: 1280px) {
      width: 1280px;
      margin-right: auto;
      margin-left: auto;
      justify-content: space-between;
    }

    @keyframes showResults {
      from {
        width: 0;
        opacity: 0;
        height: 0;
      }
      to {
        width: 100%;
        opacity: 1;
        height: auto;
      }
    }
  `}
`;

export const Details = styled.details`
  ${({ theme }) => css`
    padding: ${theme.spacing.default};
    margin: ${theme.spacing.default};
    border: 1px solid ${theme.colors.primary};
    border-radius: ${theme.radius.default};
    width: 100%;

    & > p {
      padding: ${theme.spacing.default};

      & > strong {
        font-size: 110%;
        color: ${theme.colors.secondary};
      }
    }
  `}
`;

export const Summary = styled.summary``;

export const Info = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacing.default};
    margin: ${theme.spacing.default};
    border: 1px solid ${theme.colors.primary};
    border-radius: ${theme.radius.default};
    width: 100%;

    & > p {
      & > span {
        font-size: 110%;
        font-weight: 700;
      }

      & > strong {
        color: ${theme.colors.secondary};
      }
    }

    @media (min-width: 768px) {
      width: auto;
    }
  `}
`;
