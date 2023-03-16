import InputForm from "../InputForm";
import {
  Container,
  UploadCard,
  ContentCard,
  InputFile,
  LabelFile,
  FileContainer,
} from "./styled";
import { useRef } from "react";
import ButtonForm from "../ButtonForm";
const UploadCourse = () => {
  const descriptionRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  return (
    <Container>
      <UploadCard>
        <h1>Upload Course</h1>
        <ContentCard>
          <InputForm
            type="text"
            placeholder="description"
            inputRef={descriptionRef}
          />
          <FileContainer>
            <InputFile type="file" id="fileInput" />
            <LabelFile htmlFor="fileInput" ref={fileRef}>
              Upload Image
            </LabelFile>
          </FileContainer>
          <ButtonForm onClick={() => ""}>Send</ButtonForm>
        </ContentCard>
      </UploadCard>
    </Container>
  );
};

export default UploadCourse;
