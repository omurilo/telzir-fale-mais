import styled, { css } from "styled-components";

export const LogoItem = styled.span`
  ${({ theme, color, rotate, scale }) => css`
    background-color: ${theme.colors[color] ?? theme.colors.primary};
    width: ${theme.fontSizes.large};
    height: ${theme.fontSizes.large};
    text-align: center;
    font-weight: 700;
    font-size: ${theme.fontSizes.small};
    color: ${theme.colors.white};
    border-radius: ${theme.radius.small};
    transform: rotate(${rotate}deg) scale(${scale ?? 1});
    margin-left: 1px;
  `}
`;
