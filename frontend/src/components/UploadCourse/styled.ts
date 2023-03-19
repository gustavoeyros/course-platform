import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

export const UploadCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #3f324d;
  color: white;
  gap: 100px;
  border-radius: 5px;
  width: 500px;
  height: 500px;
`;

export const ContentCard = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & button {
    width: 100%;
  }
`;

export const InputFile = styled.input`
  position: absolute;
  display: none;
`;

export const LabelFile = styled.label`
  padding: 10px 56px;
  &[for="videoinput"] {
    padding: 10px 59px;
  }
  background-color: white;
  color: black;
  border-radius: 4px;
  cursor: pointer;

  width: 100%;
`;

export const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
`;

export const UploadContainer = styled.div`
  width: 100%;
  margin-top: 25px;
`;
