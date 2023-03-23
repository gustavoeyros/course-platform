import styled from "styled-components";

export const ExamContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

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

export const ExamCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 350px;
  background-color: white;
  border-radius: 5px;

  & span {
    cursor: pointer;
  }
`;
