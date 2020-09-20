import styled, { css } from "styled-components";

export const InputLabel = styled.label``;

export const InputContainer = styled.div`
  ${({ theme }) => css`
    position: relative;
    &:before,
    &:after {
      content: "";
      height: calc(4.5rem - 30%);
      width: 2px;
      background-color: ${theme.colors.secondary};
      position: absolute;
      top: 50%;
      left: 1px;
      transform: translate(0, -50%) scale(0, 0);
      transition: 180ms ease-in-out;
    }
    &:focus-within {
      &:before,
      &:after {
        transform: translate(0, -50%) scale(1, 1);
      }
    }

    & > span {
      position: absolute;
      right: 1.5rem;
      top: 50%;
      transform: translate(0, -50%);
      svg {
        width: 1.25rem;
        color: ${theme.colors.secondary};
      }
      &:hover {
        cursor: pointer;
      }
    }

    & > span.error {
      top: 85%;
      right: 0.875rem;
      color: red;
      font-size: 0.75rem;
    }
  `}
`;

export const Input = styled.input`
  ${({ theme }) => css`
    background: ${theme.colors.inputBackground};
    border: 1px solid ${theme.colors.lightGrey};
    box-sizing: border-box;
    border-radius: 0;
    height: 4.5rem;
    padding: 0 1.5rem;
    outline: 0;
    color: ${theme.colors.textInGrey};
    font-size: 1rem;
    width: 100%;

    position: relative;
    ::placeholder {
      color: ${theme.colors.placeholder};
    }

    & + label {
      position: absolute;
      top: 50%;
      left: 1.5rem;
      z-index: 1;
      transform: translate(0, -50%);
      color: ${theme.colors.textInGrey};
      transition: 180ms ease-in-out;
    }

    &:focus,
    &:not(:placeholder-shown) {
      padding-top: 1rem;
    }

    &:placeholder-shown + label {
      opacity: 0;
    }

    &:not(:placeholder-shown) + label,
    &:focus + label {
      top: 30%;
      font-size: 75%;
      transform: translate3d(0, -65%, 0);
      opacity: 1;
    }

    &:hover {
      background-color: ${theme.colors.lightWhite};
    }

    @media (min-width: 768px) {
      width: auto;
      min-width: 22rem;
    }
  `}
`;
