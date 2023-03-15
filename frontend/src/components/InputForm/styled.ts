import styled from "styled-components";

interface IInputStyled {
  hasEmpty: boolean | undefined | null;
}

export const InputStyled = styled.input<IInputStyled>`
  outline: none;
  ${({ hasEmpty }) =>
    hasEmpty === false ? "border: 1px solid red;" : "border: none;"}
  background-color: white;
  width: 200px;
  height: 30px;
  padding: 5px;
  border-radius: 5px;
`;
