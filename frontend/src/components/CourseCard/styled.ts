import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 400px;
  height: 450px;
  background-color: #b2e7e8;
  margin-top: 5px;
  margin-left: 5px;
  border-radius: 10px;
  gap: 5px;
`;

export const ImageCourse = styled.img`
  width: 300px;
  height: 300px;
`;

export const EnrollButton = styled.button`
  width: 200px;
  height: 50px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: #8fb9aa;

  &:hover {
    background-color: #304d63;
    transition: 0.5s;
  }
`;

export const EnrolledButton = styled.button`
  width: 200px;
  height: 50px;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: #304d63;
`;

export const ContinueWatching = styled.button`
  width: 200px;
  height: 50px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  color: white;
  background-color: #304d63;
`;
