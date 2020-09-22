import styled, { css } from "styled-components";

export const Button = styled.button.attrs((props) => ({
  type: props.type ?? "button",
}))`
  ${({ theme }) => css`
    width: 100%;
    margin-top: 2.5rem;
    border: 1px solid ${theme.colors.lightGrey};
    background: ${theme.colors.white};
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
    &:before {
      content: "";
      width: 0%;
      height: 3.5rem;
      position: absolute;
      background-color: ${theme.colors.secondary};
      top: 0;
      left: 50%;
      transition: 180ms ease-in-out;
      z-index: 0;
    }
    &:before {
      transform: translate(0, 0);
    }
    &:hover {
      & span {
        color: ${theme.colors.white};
        font-weight: 700;
      }
      &:before {
        transform: translate(-50%, 0);
        width: 100%;
      }
    }
  `}
`;
