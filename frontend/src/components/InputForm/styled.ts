import styled from "styled-components";

interface IInputStyled {
  hasEmpty: boolean | undefined | null;
}

export const InputStyled = styled.input<IInputStyled>`
  outline: none;
  border: none;
  ${({ hasEmpty }) => (hasEmpty === false ? "border-color: red;" : "")}
  background-color: white;
  width: 200px;
  height: 30px;
  padding: 5px;
  border-radius: 5px;
`;
