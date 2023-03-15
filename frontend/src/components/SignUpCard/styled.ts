import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  width: 350px;
  height: 550px;
  background-color: #93c2b1;
  color: white;
  border-radius: 10px;
`;

export const SignInContianer = styled.div`
  & span {
    color: purple;
    cursor: pointer;
  }
`;
