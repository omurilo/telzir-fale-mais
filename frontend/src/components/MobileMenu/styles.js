import styled, { css } from "styled-components";
import { Link } from "components/Link/styles";

export const Container = styled.div`
  ${({ theme, isOpen }) => css`
    opacity: ${isOpen ? 1 : 0};
    margin-top: ${!isOpen ? "-100%" : 0};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    min-height: 12rem;
    z-index: 1;
    background-color: ${theme.colors.inputBackground};
    transition: ${theme.transition.default};

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (min-width: 1024px) {
      display: none;
    }
  `}
`;

export const MenuIcon = styled.span`
  ${({ theme }) => css`
    position: relative;
    width: 1rem;
    height: 1rem;
    border-top: 2px solid #585858;
    margin-top: ${theme.spacing.tiny};
    transform: scale(1.1);
    z-index: 2;
    transition: ${theme.transition.default};

    &:after,
    &:before {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      border-top: 2px solid #585858;
      transition: ${theme.transition.default};
    }

    &:before {
      top: -7px;
    }

    &:after {
      top: 2px;
      margin-top: 1px;
      margin-bottom: 0;
    }

    &.active {
      border-top: 0;
      &:before {
        top: 0%;
        transform: rotate(45deg);
      }
      &:after {
        top: -4%;
        transform: rotate(-45deg);
      }
    }

    @media (min-width: 1024px) {
      display: none;
    }
  `}
`;

export const LinkItem = styled(Link)``;
