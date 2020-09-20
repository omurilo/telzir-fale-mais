import styled, { css } from "styled-components";

export const Button = styled.button.attrs((props) => ({
  type: props.type ?? "button",
}))`
  ${({ theme }) => css`
    width: 100%;
    margin-top: 2.5rem;
    border: 1px solid ${theme.colors.lightGrey};
    background-color: ${theme.colors.secondary};
    border-radius: 8px;
    height: 3.5rem;
    outline: 0;
    cursor: pointer;
    transition: 180ms ease-in-out;
    position: relative;
    overflow: hidden;
    & span {
      position: relative;
      color: ${theme.colors.secondary};
      z-index: 1;
    }
    &:before,
    &:after {
      content: "";
      width: 50%;
      height: 3.5rem;
      position: absolute;
      top: 0;
      background: ${theme.colors.white};
      transition: 180ms ease-in-out;
      z-index: 0;
    }
    &:before {
      left: 0;
    }
    &:after {
      right: 0;
    }
    &:hover {
      & span {
        color: ${theme.colors.white};
      }
      &:before,
      &:after {
        width: 0;
      }
    }
  `}
`;
