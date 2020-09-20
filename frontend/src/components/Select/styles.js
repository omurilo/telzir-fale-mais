import styled, { css } from "styled-components";
import SelectComponent, { components } from "react-select";

export const Container = styled.div`
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
      z-index: 1;
    }
    &:focus-within {
      &:before,
      &:after {
        transform: translate(0, -50%) scale(1, 1);
      }
    }
  `}
`;

export const Label = styled.label``;

const Control = styled(components.Control)`
  ${({ theme }) => css`
    width: 100%;
    height: 4.5rem;
    margin-top: 0.8rem;
    color: ${theme.colors.darkerGrey};
    outline: 0;
    font-size: 1rem;
    position: relative;
  `}
`;

const Option = styled(components.Option)`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-top: 1px solid ${theme.colors.secondary};
    height: 5.6rem;
    padding: 0 2.4rem;
    &:hover {
      font-weight: 700;
    }
  `}
`;

export const Select = styled(SelectComponent).attrs(({ theme }) => ({
  noOptionsMessage: () => "Nada encontrado",
  isSearchable: true,
  isClearable: true,
  components: { Control, Option },
  styles: {
    placeholder: (base) => ({
      ...base,
      color: theme.colors.placeholder,
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0 1.5rem",
      height: "100%",
    }),
    control: (base, state) => ({
      ...base,
      backgroundColor: theme.colors.inputBackground,
      boxShadow: "none",
      border: `1px solid ${theme.colors.lighterGrey}`,
      borderRadius: `${theme.radius.default} ${theme.radius.default} 0 0`,
      borderBottomLeftRadius: state.menuIsOpen && 0,
      borderBottomRightRadius: state.menuIsOpen && 0,
      ":hover": {
        borderColor: theme.colors.lighterGrey,
        backgroundColor: theme.colors.lightWhite,
      },
    }),
    menu: (base) => ({
      ...base,
      boxShadow: "none",
      border: "none",
      borderTop: 0,
      marginTop: "-0.2rem",
      borderRadius: 0,
      backgroundColor: theme.colors.inputBackground,
      zIndex: 2,
    }),
    menuList: () => ({}),
    option: (base, state) => ({
      backgroundColor: state.isSelected
        ? theme.colors.lightWhite
        : theme.colors.inputBackground,
      borderLeft: `0.2rem solid ${
        state.isSelected ? theme.colors.secondary : theme.colors.inputBackground
      }`,
      fontWeight: state.isSelected && 700,
      borderTopColor: theme.colors.lightGrey,
      ":hover": {
        borderLeftColor: theme.colors.secondary,
        backgroundColor: theme.colors.lightWhite,
      },
    }),
  },
}))`
  ${({ theme }) => css`
    width: 100%;
    & + label {
      position: absolute;
      top: 50%;
      left: 1.5rem;
      z-index: 1;
      transform: translate(0, -50%);
      color: ${theme.colors.textInGrey};
      transition: 180ms ease-in-out;
      opacity: 0;
    }

    &:focus,
    &:not(input:placeholder-shown) {
      padding-top: 1rem;
    }

    & input:placeholder-shown + label {
      opacity: 0;
    }

    &:not(input:placeholder-shown) + label,
    &:focus + label {
      top: 30%;
      font-size: 75%;
      transform: translate3d(0, -65%, 0);
      opacity: 1;
    }

    @media (min-width: 768px) {
      width: auto;
    }
  `}
`;
