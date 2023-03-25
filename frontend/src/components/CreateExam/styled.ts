import styled from "styled-components";
import { GrAddCircle } from "react-icons/gr";

export const Backdrop = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.75);
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  width: 450px;
  height: 450px;
  background-color: #8fb9aa;
`;

export const ExitButton = styled.button`
  background-color: #fd5249;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
  width: 200px;
  height: 50px;
  color: white;
`;

export const SendButton = styled.button`
  background-color: #68a33e;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
  width: 200px;
  height: 50px;
  color: white;
`;

export const AddOptionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  & i {
    position: absolute;
    margin-left: 180px;
  }
`;

export const IconContainer = styled.i``;

export const Teste = styled.input``;
