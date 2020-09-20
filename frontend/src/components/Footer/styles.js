import styled, { css } from "styled-components";
import { Facebook, Twitter } from "styled-icons/boxicons-logos";

export const Footer = styled.footer`
  ${({ theme }) => css`
    padding: ${theme.spacing.default};
    display: flex;
    justify-content: space-between;
    align-items: center;
  `}

  & > div {
    display: flex;
    align-items: center;

    & > svg {
      color: ${({ theme }) => theme.colors.white};
      background: ${({ theme }) => theme.colors.primary};
      border-radius: 50%;
      padding: ${({ theme }) => theme.spacing.little};
      margin-left: ${({ theme }) => theme.spacing.tiny};
    }
  }
`;

export const FaceIcon = styled(Facebook)``;

export const TwitterIcon = styled(Twitter)``;
