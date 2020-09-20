import styled, { css } from "styled-components";

export const Container = styled.main`
  flex: auto;
`;

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
`;
export const Header = styled.div`
  ${({ theme }) => css`
    width: 100%;
    padding: ${theme.spacing.default};

    & > h1 {
      margin-bottom: ${theme.spacing.small};
    }

    & > ul {
      list-style: "- ";
      margin-left: ${theme.spacing.default};
    }

    @media (min-width: 768px) {
      width: 22rem;
    }
  `};
`;

export const Main = styled.div`
  width: 100%;
  @media (min-width: 768px) {
    width: auto;
  }
`;

export const Form = styled.form`
  ${({ theme }) => css`
    width: 100%;
    padding: ${theme.spacing.default};

    & input {
      border-bottom: 0;
    }

    .radiusTop {
      border-radius: ${theme.radius.default} ${theme.radius.default} 0 0;
    }

    .radiusTop > div:first-child {
      border-bottom: none;
    }

    .radiusBottom {
      border-radius: 0 0 ${theme.radius.default} ${theme.radius.default};
      border-bottom: 1px solid ${theme.colors.lightGrey};
    }

    @media (min-width: 768px) {
      padding: ${theme.spacing.default} ${theme.spacing.big};
    }
  `};
`;
